import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiExternalLink, FiFilter } from 'react-icons/fi';
import { publicApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Web', 'Mobile', 'SaaS', 'CRM', 'E-commerce', 'AI', 'Other'];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await publicApi.getProjects();
                setProjects(response.data || []);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter((p) => {
            const catStr = (p.category || p.techStack?.join(' ') || p.title || '').toLowerCase();
            return catStr.includes(activeCategory.toLowerCase());
        });

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <SEO
                title="Our Portfolio"
                description="Explore client projects, case studies, and modern digital software applications engineered by DSofts IT Services."
            />

            {/* Header */}
            <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="container-custom text-center max-w-4xl mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 font-semibold text-xs uppercase tracking-widest border border-primary-500/20 mb-6">
                        Client Work Showcase
                    </span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold font-heading mb-6"
                    >
                        Our Client Portfolio
                    </motion.h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light">
                        A curated collection of web applications, mobile software, and digital solutions delivered for growing businesses.
                    </p>
                </div>
            </div>

            <div className="container-custom py-16">
                {/* Category Filters */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 justify-start md:justify-center">
                    <FiFilter className="text-slate-400 flex-shrink-0 mr-1" />
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                                activeCategory === cat
                                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-80 bg-white rounded-2xl border border-slate-200 animate-pulse"></div>
                        ))}
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">No Projects Found</h3>
                        <p className="text-slate-600 text-sm">There are no projects matching the "{activeCategory}" filter.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="relative h-56 overflow-hidden bg-slate-950">
                                        <img
                                            src={project.thumbnailImageUrl || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80'}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <Link
                                                to={`/portfolio/${project.slug}`}
                                                className="text-white text-xs font-bold flex items-center gap-2 hover:underline"
                                            >
                                                <span>View Project Case Study</span>
                                                <FiArrowRight />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {project.techStack?.slice(0, 3).map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors font-heading">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-600 text-xs mb-4 line-clamp-2 leading-relaxed">
                                            {project.shortDescription}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                                    <span className="text-[11px] font-medium text-slate-500">
                                        Client: {project.clientName || 'Private Client'}
                                    </span>
                                    <Link
                                        to={`/portfolio/${project.slug}`}
                                        className="inline-flex items-center text-xs font-bold text-primary-600 hover:text-primary-700 gap-1"
                                    >
                                        <span>Details</span>
                                        <FiArrowRight />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Portfolio;
