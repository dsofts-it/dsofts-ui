import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Globe } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-20 pb-32 lg:pt-32 lg:pb-40">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-200/30 blur-3xl animate-float" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary-200/30 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-primary-100/40 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium text-sm mb-6 border border-primary-100">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                            </span>
                            Available for new projects
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-heading font-bold text-slate-900 leading-tight mb-6">
                            We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Digital</span> Experiences
                        </h1>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                            Transform your business with cutting-edge web and mobile solutions. We combine creativity with technology to deliver exceptional results.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/contact" className="btn btn-primary group">
                                Start a Project
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                            <Link to="/portfolio" className="btn btn-secondary">
                                View Portfolio
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-slate-500">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <Globe size={20} />
                                </div>
                                <span className="font-medium">Web</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                    <Smartphone size={20} />
                                </div>
                                <span className="font-medium">Mobile</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                    <Code size={20} />
                                </div>
                                <span className="font-medium">Custom</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-white rounded-2xl shadow-2xl shadow-primary-500/20 border border-gray-100 p-4 rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Dashboard Preview"
                                className="rounded-lg w-full h-auto"
                            />

                            {/* Floating Cards */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-3"
                            >
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <Code size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Code Quality</p>
                                    <p className="font-bold text-slate-900">Clean & Scalable</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -top-8 -right-8 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-3"
                            >
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Global Reach</p>
                                    <p className="font-bold text-slate-900">SEO Optimized</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary-100/50 to-secondary-100/50 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
