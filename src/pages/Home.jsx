import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiCode, FiSmartphone, FiGlobe, FiServer, FiLayout } from 'react-icons/fi';
import { publicApi } from '../api/endpoints';

const Home = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, servicesRes] = await Promise.all([
                    publicApi.getProjects({ featured: true, limit: 3 }),
                    publicApi.getServices()
                ]);
                setFeaturedProjects(projectsRes.data);
                setServices(servicesRes.data.slice(0, 3)); // Show only first 3 services
            } catch (error) {
                console.error('Failed to fetch home data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getIcon = (title) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('web')) return <FiGlobe />;
        if (lowerTitle.includes('mobile') || lowerTitle.includes('app')) return <FiSmartphone />;
        if (lowerTitle.includes('backend') || lowerTitle.includes('api')) return <FiServer />;
        if (lowerTitle.includes('ui') || lowerTitle.includes('design')) return <FiLayout />;
        return <FiCode />;
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-900 text-white">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary-600/20 blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-secondary-600/20 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Available for new projects
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6">
                            We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Digital Experiences</span> That Matter.
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-lg">
                            DSofts is a premium software development agency specializing in building scalable web and mobile applications for forward-thinking businesses.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/contact" className="btn btn-primary text-lg px-8 py-4">
                                Start a Project
                            </Link>
                            <Link to="/portfolio" className="btn btn-outline text-lg px-8 py-4">
                                View Our Work
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="space-y-4 font-mono text-sm text-gray-300">
                                <div className="flex gap-2">
                                    <span className="text-primary-400">const</span>
                                    <span className="text-yellow-400">dsofts</span>
                                    <span className="text-white">=</span>
                                    <span className="text-primary-400">new</span>
                                    <span className="text-green-400">Agency</span>
                                    <span className="text-white">({'{'}</span>
                                </div>
                                <div className="pl-4">
                                    <span className="text-blue-300">quality:</span> <span className="text-orange-400">'Premium'</span>,
                                </div>
                                <div className="pl-4">
                                    <span className="text-blue-300">speed:</span> <span className="text-orange-400">'Fast'</span>,
                                </div>
                                <div className="pl-4">
                                    <span className="text-blue-300">stack:</span> <span className="text-white">['React', 'Node', 'Cloud']</span>
                                </div>
                                <div><span className="text-white">{'}'});</span></div>
                                <div className="flex gap-2 mt-4">
                                    <span className="text-purple-400">await</span>
                                    <span className="text-yellow-400">dsofts</span>
                                    <span className="text-white">.</span>
                                    <span className="text-blue-400">transform</span>
                                    <span className="text-white">(</span>
                                    <span className="text-orange-400">'YourBusiness'</span>
                                    <span className="text-white">);</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">Our Expertise</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We deliver end-to-end solutions, from initial concept to final deployment and maintenance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
                            ))
                        ) : (
                            services.map((service, index) => (
                                <motion.div
                                    key={service._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center text-xl mb-6">
                                        {getIcon(service.title)}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {service.description}
                                    </p>
                                    <Link to="/services" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
                                        Learn more <FiArrowRight />
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">Featured Work</h2>
                            <p className="text-gray-600 max-w-2xl">
                                A selection of our most impactful projects.
                            </p>
                        </div>
                        <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700">
                            View all projects <FiArrowRight />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse"></div>
                            ))
                        ) : (
                            featuredProjects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative rounded-2xl overflow-hidden shadow-lg"
                                >
                                    <div className="aspect-w-16 aspect-h-12">
                                        <img
                                            src={project.thumbnailImageUrl || 'https://via.placeholder.com/600x400'}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.shortDescription}</p>
                                        <Link
                                            to={`/portfolio/${project.slug}`}
                                            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary-300"
                                        >
                                            View Case Study <FiArrowRight />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/portfolio" className="btn btn-outline text-primary-600 border-primary-600 hover:bg-primary-50">
                            View all projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-gray-900 z-0"></div>
                <div className="container-custom relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">Ready to transform your business?</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                        Let's discuss your project and see how we can help you achieve your goals with our premium IT services.
                    </p>
                    <Link to="/contact" className="btn btn-primary text-lg px-8 py-4 shadow-xl shadow-primary-900/20">
                        Get a Free Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
