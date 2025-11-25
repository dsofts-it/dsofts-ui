import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiBox, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { clientApi } from '../../api/endpoints';

const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        projectTitle: '',
        projectDescription: '',
        estimatedBudget: '',
    });
    const [submitStatus, setSubmitStatus] = useState('idle');
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await clientApi.getMyProjects();
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');

        try {
            await clientApi.createProject(formData);
            setSubmitStatus('success');
            setFormData({ projectTitle: '', projectDescription: '', estimatedBudget: '' });
            fetchProjects(); // Refresh list
            setTimeout(() => {
                setSubmitStatus('idle');
                setActiveTab('projects');
            }, 2000);
        } catch (error) {
            console.error('Failed to create project:', error);
            setSubmitStatus('error');
            setSubmitError(error.response?.data?.message || 'Failed to create project');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800';
            case 'in_discussion': return 'bg-yellow-100 text-yellow-800';
            case 'in_progress': return 'bg-purple-100 text-purple-800';
            case 'deployed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-8">
            {/* Tabs */}
            <div className="flex space-x-4 border-b border-gray-200 pb-1">
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'projects' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    My Projects
                    {activeTab === 'projects' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('new')}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'new' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    New Request
                    {activeTab === 'new' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {activeTab === 'projects' ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
                            <button
                                onClick={() => setActiveTab('new')}
                                className="btn btn-primary text-sm py-2 px-4 flex items-center gap-2"
                            >
                                <FiPlus /> New Project
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <FiBox className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
                                <p className="text-gray-500 mb-6">Start your first project with us today.</p>
                                <button
                                    onClick={() => setActiveTab('new')}
                                    className="btn btn-outline text-primary-600 border-primary-600 hover:bg-primary-50"
                                >
                                    Create Request
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {projects.map((project) => (
                                    <div key={project._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{project.projectTitle}</h3>
                                                <p className="text-sm text-gray-500">Created on {new Date(project.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(project.status)}`}>
                                                {project.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4">{project.projectDescription}</p>

                                        {project.adminNotes && (
                                            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-4">
                                                <span className="font-bold">Admin Note:</span> {project.adminNotes}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                                            {project.estimatedBudget && (
                                                <span className="flex items-center gap-1">
                                                    <span className="font-medium text-gray-900">Budget:</span> {project.estimatedBudget}
                                                </span>
                                            )}
                                            {project.deploymentUrl && (
                                                <a
                                                    href={project.deploymentUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary-600 hover:underline flex items-center gap-1 ml-auto"
                                                >
                                                    View Deployment <FiCheckCircle />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Start a New Project</h2>

                        {submitStatus === 'success' ? (
                            <div className="bg-green-50 text-green-800 p-6 rounded-xl text-center">
                                <FiCheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                                <h3 className="text-lg font-bold mb-2">Request Submitted!</h3>
                                <p>We've received your project request. Our team will review it and get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                {submitStatus === 'error' && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
                                        <FiAlertCircle /> {submitError}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                                    <input
                                        type="text"
                                        name="projectTitle"
                                        required
                                        className="input-field"
                                        placeholder="e.g., E-commerce Website Redesign"
                                        value={formData.projectTitle}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="projectDescription"
                                        required
                                        rows="4"
                                        className="input-field resize-none"
                                        placeholder="Describe your project requirements, goals, and any specific features you need..."
                                        value={formData.projectDescription}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget (Optional)</label>
                                    <input
                                        type="text"
                                        name="estimatedBudget"
                                        className="input-field"
                                        placeholder="e.g., $5,000 - $10,000"
                                        value={formData.estimatedBudget}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitStatus === 'loading'}
                                    className="btn btn-primary w-full flex justify-center items-center gap-2"
                                >
                                    {submitStatus === 'loading' ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientDashboard;
