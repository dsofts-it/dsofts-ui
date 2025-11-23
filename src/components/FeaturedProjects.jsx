import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import api from '../api/axios';

const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects?featured=true&limit=3');
                setProjects(response.data);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-slate-50">
                <div className="container-custom text-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-64 bg-slate-200 rounded mb-4"></div>
                        <div className="h-4 w-96 bg-slate-200 rounded mb-12"></div>
                        <div className="grid md:grid-cols-3 gap-8 w-full">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-96 bg-slate-200 rounded-2xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-slate-50">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Featured Projects
                        </h2>
                        <p className="text-lg text-slate-600">
                            Explore some of our recent work and see how we've helped businesses transform their digital presence.
                        </p>
                    </div>
                    <Link to="/portfolio" className="btn btn-outline text-primary-600 border-primary-600 hover:bg-primary-50 whitespace-nowrap">
                        View All Projects
                        <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card group h-full flex flex-col"
                        >
                            <div className="relative overflow-hidden h-48">
                                <img
                                    src={project.thumbnailImageUrl || 'https://via.placeholder.com/400x300'}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        View Details <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techStack.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-md">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                                    {project.shortDescription}
                                </p>

                                <Link
                                    to={`/portfolio/${project.slug}`}
                                    className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 transition-colors"
                                >
                                    Read Case Study <ExternalLink size={16} className="ml-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
