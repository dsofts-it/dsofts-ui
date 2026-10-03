import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiImage } from 'react-icons/fi';
import { adminApi, publicApi } from '../../api/endpoints';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [uploading, setUploading] = useState(false);

    const initialFormState = {
        title: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        techStack: '', // comma separated
        clientName: '',
        clientRating: '',
        websiteUrl: '',
        completedAt: '',
        isFeatured: false,
        thumbnailImageUrl: '',
        bannerImageUrl: ''
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await publicApi.getProjects();
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setIsEditing(true);
        setCurrentProject(project);
        setFormData({
            title: project.title,
            slug: project.slug,
            shortDescription: project.shortDescription,
            fullDescription: project.fullDescription,
            techStack: project.techStack.join(', '),
            clientName: project.clientName || '',
            clientRating: project.clientRating || '',
            websiteUrl: project.websiteUrl || '',
            completedAt: project.completedAt ? project.completedAt.split('T')[0] : '',
            isFeatured: project.isFeatured || false,
            thumbnailImageUrl: project.thumbnailImageUrl || '',
            bannerImageUrl: project.bannerImageUrl || ''
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await adminApi.deleteProject(id);
            setProjects(projects.filter(p => p._id !== id));
        } catch (error) {
            console.error('Failed to delete project:', error);
            alert('Failed to delete project');
        }
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', 'portfolio');

        setUploading(true);
        try {
            const res = await adminApi.uploadImage(formData);
            setFormData(prev => ({ ...prev, [field]: res.data.url }));
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            techStack: formData.techStack.split(',').map(t => t.trim()).filter(t => t),
            websiteUrl: formData.websiteUrl || undefined,
            clientRating: formData.clientRating ? Number(formData.clientRating) : undefined
        };

        try {
            if (currentProject) {
                const res = await adminApi.updateProject(currentProject._id, data);
                setProjects(projects.map(p => p._id === currentProject._id ? res.data : p));
            } else {
                const res = await adminApi.createProject(data);
                setProjects([...projects, res.data]);
            }
            resetForm();
        } catch (error) {
            console.error('Failed to save project:', error);
            alert('Failed to save project. Check console for details.');
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentProject(null);
        setFormData(initialFormState);
    };

    if (loading) return <div className="text-center py-10">Loading projects...</div>;

    return (
        <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                    <h2 className="text-xl font-bold font-heading text-slate-900">Portfolio & Client Projects ({projects.length})</h2>
                    <p className="text-xs text-slate-500">Manage case studies, showcase deliverables, and live tech stack features.</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setIsEditing(true);
                    }}
                    className="btn btn-primary text-xs py-2.5 px-4 flex items-center gap-2 rounded-xl font-bold shadow-sm"
                >
                    <FiPlus size={16} /> Add New Project
                </button>
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                        <div>
                            <div className="h-44 overflow-hidden relative bg-slate-100">
                                <img
                                    src={project.thumbnailImageUrl || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80'}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {project.isFeatured && (
                                    <span className="absolute top-3 left-3 bg-amber-500 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-xs">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <div className="p-5 space-y-2">
                                <h3 className="font-bold text-slate-900 text-base font-heading line-clamp-1">{project.title}</h3>
                                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{project.shortDescription}</p>
                                <div className="flex flex-wrap gap-1 pt-2">
                                    {project.techStack?.map((t, idx) => (
                                        <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-mono text-[11px] truncate max-w-[140px]">{project.slug}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="btn btn-secondary py-1.5 px-3 text-xs gap-1 font-semibold"
                                >
                                    <FiEdit2 size={13} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Project"
                                >
                                    <FiTrash2 size={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form */}
            {isEditing && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-3xl w-full p-6 md:p-8 border border-slate-200 shadow-2xl relative my-8">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                            <div>
                                <h3 className="text-lg font-bold font-heading text-slate-900">
                                    {currentProject ? 'Edit Project Details' : 'Add New Portfolio Project'}
                                </h3>
                                <p className="text-xs text-slate-500">Specify title, slug, stack, client review, and images.</p>
                            </div>
                            <button onClick={resetForm} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
                                <FiX size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title *</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field text-sm"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. HealthCare Telemedicine App"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Slug URL *</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field text-sm"
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                        placeholder="e.g. healthcare-telemedicine-app"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Live URL (Optional)</label>
                                <input
                                    type="url"
                                    className="input-field text-sm"
                                    placeholder="https://example.com"
                                    value={formData.websiteUrl}
                                    onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description *</label>
                                <textarea
                                    required
                                    rows="2"
                                    className="input-field text-sm resize-none"
                                    value={formData.shortDescription}
                                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                                    placeholder="Brief summary of what this project delivers..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Description *</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="input-field text-sm font-sans"
                                    value={formData.fullDescription}
                                    onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                                    placeholder="Detailed description of features, tech stack architecture, and outcomes..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Tech Stack (Comma Separated) *</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field text-sm"
                                    placeholder="React, Node.js, Flutter, MongoDB, Cloud"
                                    value={formData.techStack}
                                    onChange={e => setFormData({ ...formData, techStack: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Client Name</label>
                                    <input
                                        type="text"
                                        className="input-field text-sm"
                                        value={formData.clientName}
                                        onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rating (1 - 5)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        className="input-field text-sm"
                                        value={formData.clientRating}
                                        onChange={e => setFormData({ ...formData, clientRating: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Completion Date</label>
                                    <input
                                        type="date"
                                        className="input-field text-sm"
                                        value={formData.completedAt}
                                        onChange={e => setFormData({ ...formData, completedAt: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Thumbnail Image URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="input-field text-sm"
                                            value={formData.thumbnailImageUrl}
                                            onChange={e => setFormData({ ...formData, thumbnailImageUrl: e.target.value })}
                                            placeholder="https://..."
                                        />
                                        <label className="btn btn-secondary px-3 cursor-pointer flex items-center justify-center">
                                            <FiUpload />
                                            <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'thumbnailImageUrl')} />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Banner Image URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="input-field text-sm"
                                            value={formData.bannerImageUrl}
                                            onChange={e => setFormData({ ...formData, bannerImageUrl: e.target.value })}
                                            placeholder="https://..."
                                        />
                                        <label className="btn btn-secondary px-3 cursor-pointer flex items-center justify-center">
                                            <FiUpload />
                                            <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'bannerImageUrl')} />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="isFeatured"
                                    className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                                    checked={formData.isFeatured}
                                    onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                />
                                <label htmlFor="isFeatured" className="text-xs font-semibold text-slate-700">Mark as Featured Project on Homepage</label>
                            </div>

                            <div className="pt-4 flex gap-3 border-t border-slate-100">
                                <button type="submit" disabled={uploading} className="btn btn-primary flex-1 py-3 text-sm font-bold">
                                    {uploading ? 'Uploading...' : (currentProject ? 'Save Changes' : 'Create Project')}
                                </button>
                                <button type="button" onClick={resetForm} className="btn btn-secondary flex-1 py-3 text-sm">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProjects;
