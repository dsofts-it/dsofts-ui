import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiUser, FiStar, FiExternalLink, FiLayers } from 'react-icons/fi';
import { publicApi } from '../api/endpoints';

const ProjectDetails = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await publicApi.getProjectBySlug(slug);
                setProject(response.data);
            } catch (err) {
                setError('Failed to load project details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
                <p className="text-gray-600 mb-8">{error || "The project you're looking for doesn't exist."}</p>
                <Link to="/portfolio" className="btn btn-primary">
                    Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/60 z-10" />
                <img
                    src={project.bannerImageUrl || project.thumbnailImageUrl || 'https://via.placeholder.com/1920x1080'}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="container-custom text-center text-white">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold font-heading mb-4"
                        >
                            {project.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-200 max-w-2xl mx-auto"
                        >
                            {project.shortDescription}
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="container-custom -mt-20 relative z-30">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <Link to="/portfolio" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 transition-colors">
                        <FiArrowLeft className="mr-2" /> Back to Portfolio
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Project</h2>
                                <div className="prose prose-lg text-gray-600 max-w-none whitespace-pre-line">
                                    {project.fullDescription}
                                </div>
                            </div>

                            {project.techStack && project.techStack.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FiLayers className="text-primary-600" />
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {project.websiteUrl && (
                                        <a
                                            href={project.websiteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-5 inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
                                        >
                                            Visit Website
                                            <FiExternalLink />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-4">
                                    Project Info
                                </h3>

                                {project.clientName && (
                                    <div className="flex items-start gap-3">
                                        <FiUser className="mt-1 text-primary-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Client</p>
                                            <p className="font-medium text-gray-900">{project.clientName}</p>
                                        </div>
                                    </div>
                                )}

                                {project.completedAt && (
                                    <div className="flex items-start gap-3">
                                        <FiCalendar className="mt-1 text-primary-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Completion Date</p>
                                            <p className="font-medium text-gray-900">
                                                {new Date(project.completedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {project.clientRating && (
                                    <div className="flex items-start gap-3">
                                        <FiStar className="mt-1 text-yellow-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Client Rating</p>
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium text-gray-900">{project.clientRating}/5</span>
                                                <div className="flex text-yellow-400 text-xs">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FiStar key={i} fill={i < project.clientRating ? "currentColor" : "none"} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Call to Action */}
                            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl p-6 text-white text-center">
                                <h3 className="text-xl font-bold mb-2">Want a similar project?</h3>
                                <p className="text-primary-100 mb-6 text-sm">
                                    Let's discuss your requirements and bring your ideas to life.
                                </p>
                                <Link to="/contact" className="btn bg-white text-primary-600 w-full hover:bg-gray-50 border-none">
                                    Start a Project
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
