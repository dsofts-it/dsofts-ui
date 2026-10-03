import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiUser, FiStar, FiExternalLink, FiLayers } from 'react-icons/fi';
import { publicApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

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
                <h2 className="text-2xl font-bold text-slate-800 mb-4 font-heading">Project Not Found</h2>
                <p className="text-slate-600 mb-8">{error || "The project you're looking for doesn't exist."}</p>
                <Link to="/portfolio" className="btn btn-primary">
                    Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20 pt-20">
            <SEO
                title={project.title}
                description={project.shortDescription}
            />

            {/* Hero Section */}
            <div className="relative h-[45vh] min-h-[350px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-slate-950/70 z-10" />
                <img
                    src={project.bannerImageUrl || project.thumbnailImageUrl || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&auto=format&fit=crop&q=80'}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="container-custom text-center text-white max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold font-heading mb-4"
                        >
                            {project.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-base md:text-lg text-slate-200 font-light"
                        >
                            {project.shortDescription}
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="container-custom -mt-16 relative z-30 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12">
                    <Link to="/portfolio" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-primary-600 mb-8 transition-colors">
                        <FiArrowLeft className="mr-2" /> Back to Portfolio
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">Project Overview</h2>
                                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm whitespace-pre-line">
                                    {project.fullDescription}
                                </div>
                            </div>

                            {project.techStack && project.techStack.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-heading">
                                        <FiLayers className="text-primary-600" />
                                        Technologies Used
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3.5 py-1.5 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold"
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
                                            className="mt-6 inline-flex items-center gap-2 text-sm text-primary-600 font-bold hover:underline"
                                        >
                                            <span>Visit Live Website</span>
                                            <FiExternalLink />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6">
                                <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 font-heading">
                                    Project Metadata
                                </h3>

                                {project.clientName && (
                                    <div className="flex items-start gap-3 text-xs">
                                        <FiUser className="mt-0.5 text-primary-600" size={16} />
                                        <div>
                                            <p className="text-slate-500 font-medium">Client</p>
                                            <p className="font-bold text-slate-900">{project.clientName}</p>
                                        </div>
                                    </div>
                                )}

                                {project.completedAt && (
                                    <div className="flex items-start gap-3 text-xs">
                                        <FiCalendar className="mt-0.5 text-primary-600" size={16} />
                                        <div>
                                            <p className="text-slate-500 font-medium">Completed Date</p>
                                            <p className="font-bold text-slate-900">
                                                {new Date(project.completedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {project.clientRating && (
                                    <div className="flex items-start gap-3 text-xs">
                                        <FiStar className="mt-0.5 text-amber-500" size={16} />
                                        <div>
                                            <p className="text-slate-500 font-medium">Client Rating</p>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <span className="font-bold text-slate-900">{project.clientRating}/5</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-4 shadow-md">
                                <h3 className="text-lg font-bold font-heading">Want a similar product built?</h3>
                                <p className="text-slate-300 text-xs leading-relaxed">
                                    Let's discuss your requirements and engineer your solution.
                                </p>
                                <Link to="/contact" className="btn btn-primary w-full py-2.5 text-xs">
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
