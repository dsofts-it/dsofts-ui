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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List */}
            <div className="lg:col-span-1 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Projects ({projects.length})</h2>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-primary text-sm py-2 px-4 flex items-center gap-2"
                        >
                            <FiPlus /> Add Project
                        </button>
                    )}
                </div>

                <div className="grid gap-4 max-h-[800px] overflow-y-auto pr-2">
                    {projects.map((project) => (
                        <div key={project._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 group cursor-pointer hover:border-primary-200" onClick={() => handleEdit(project)}>
                            <div className="flex gap-4">
                                <img
                                    src={project.thumbnailImageUrl || 'https://via.placeholder.com/100'}
                                    alt={project.title}
                                    className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 truncate">{project.title}</h3>
                                    <p className="text-xs text-gray-500 mb-1 truncate">{project.slug}</p>
                                    <div className="flex gap-2">
                                        {project.isFeatured && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Featured</span>}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(project._id); }}
                                    className="text-gray-400 hover:text-red-600 p-2"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form */}
            {isEditing && (
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">
                            {currentProject ? 'Edit Project' : 'New Project'}
                        </h3>
                        <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                            <FiX />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                            <textarea
                                required
                                rows="2"
                                className="input-field resize-none"
                                value={formData.shortDescription}
                                onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Description (Markdown supported)</label>
                            <textarea
                                required
                                rows="6"
                                className="input-field resize-none font-mono text-sm"
                                value={formData.fullDescription}
                                onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack (comma separated)</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="React, Node.js, MongoDB"
                                value={formData.techStack}
                                onChange={e => setFormData({ ...formData, techStack: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.clientName}
                                    onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Rating (1-5)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    className="input-field"
                                    value={formData.clientRating}
                                    onChange={e => setFormData({ ...formData, clientRating: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Completed At</label>
                                <input
                                    type="date"
                                    className="input-field"
                                    value={formData.completedAt}
                                    onChange={e => setFormData({ ...formData, completedAt: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={formData.thumbnailImageUrl}
                                        onChange={e => setFormData({ ...formData, thumbnailImageUrl: e.target.value })}
                                        placeholder="https://..."
                                    />
                                    <label className="btn btn-secondary px-3 cursor-pointer">
                                        <FiUpload />
                                        <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'thumbnailImageUrl')} />
                                    </label>
                                </div>
                                {formData.thumbnailImageUrl && (
                                    <img src={formData.thumbnailImageUrl} alt="Thumbnail" className="mt-2 h-20 rounded object-cover" />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={formData.bannerImageUrl}
                                        onChange={e => setFormData({ ...formData, bannerImageUrl: e.target.value })}
                                        placeholder="https://..."
                                    />
                                    <label className="btn btn-secondary px-3 cursor-pointer">
                                        <FiUpload />
                                        <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'bannerImageUrl')} />
                                    </label>
                                </div>
                                {formData.bannerImageUrl && (
                                    <img src={formData.bannerImageUrl} alt="Banner" className="mt-2 h-20 rounded object-cover" />
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isFeatured"
                                className="rounded text-primary-600 focus:ring-primary-500"
                                checked={formData.isFeatured}
                                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                            />
                            <label htmlFor="isFeatured" className="text-sm text-gray-700">Mark as Featured Project</label>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button type="submit" disabled={uploading} className="btn btn-primary flex-1">
                                {uploading ? 'Uploading...' : (currentProject ? 'Update Project' : 'Create Project')}
                            </button>
                            <button type="button" onClick={resetForm} className="btn btn-secondary flex-1">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminProjects;
