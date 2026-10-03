import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiArrowRight, FiCheck, FiCode, FiSmartphone, FiGlobe, FiServer, FiLayout,
    FiLayers, FiShield, FiCpu, FiTrendingUp, FiHelpCircle, FiChevronDown, FiBriefcase, FiUsers, FiAward
} from 'react-icons/fi';
import { publicApi } from '../api/endpoints';
import HappyClients from '../components/HappyClients';
import SEO from '../components/common/SEO';

const Home = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [services, setServices] = useState([]);
    const [caseStudies, setCaseStudies] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openFaq, setOpenFaq] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, servicesRes, caseStudiesRes, testimonialsRes] = await Promise.allSettled([
                    publicApi.getProjects({ featured: true, limit: 3 }),
                    publicApi.getServices(),
                    publicApi.getCaseStudies(),
                    publicApi.getTestimonials()
                ]);

                if (projectsRes.status === 'fulfilled') setFeaturedProjects(projectsRes.value.data || []);
                if (servicesRes.status === 'fulfilled') setServices(servicesRes.value.data || []);
                if (caseStudiesRes.status === 'fulfilled') setCaseStudies((caseStudiesRes.value.data || []).slice(0, 2));
                if (testimonialsRes.status === 'fulfilled') setTestimonials(testimonialsRes.value.data || []);
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
        if (lowerTitle.includes('web')) return <FiGlobe className="w-6 h-6" />;
        if (lowerTitle.includes('mobile') || lowerTitle.includes('app')) return <FiSmartphone className="w-6 h-6" />;
        if (lowerTitle.includes('backend') || lowerTitle.includes('api')) return <FiServer className="w-6 h-6" />;
        if (lowerTitle.includes('ui') || lowerTitle.includes('design')) return <FiLayout className="w-6 h-6" />;
        return <FiCode className="w-6 h-6" />;
    };

    const techStack = [
        { name: 'React', category: 'Frontend' },
        { name: 'JavaScript', category: 'Frontend' },
        { name: 'Tailwind CSS', category: 'Frontend' },
        { name: 'Node.js', category: 'Backend' },
        { name: 'Express.js', category: 'Backend' },
        { name: 'Java', category: 'Backend' },
        { name: 'Spring Boot', category: 'Backend' },
        { name: 'Flutter', category: 'Mobile' },
        { name: 'Dart', category: 'Mobile' },
        { name: 'MongoDB', category: 'Database' },
        { name: 'PostgreSQL', category: 'Database' },
        { name: 'MySQL', category: 'Database' },
        { name: 'Firebase', category: 'Cloud' },
        { name: 'AWS Cloud', category: 'Cloud' },
        { name: 'REST APIs', category: 'Architecture' },
        { name: 'Git & GitHub', category: 'DevOps' },
    ];

    const developmentSteps = [
        { step: '01', title: 'Discovery & Audit', desc: 'Understanding your business requirements, user target audience, and product goals.' },
        { step: '02', title: 'Architecture Planning', desc: 'Defining technical stack, database schemas, and microservice boundaries.' },
        { step: '03', title: 'UI/UX Prototype Design', desc: 'Creating wireframes, interactive user flows, and modern design systems.' },
        { step: '04', title: 'Agile Development', desc: 'Iterative sprint coding with continuous integration and clean code reviews.' },
        { step: '05', title: 'Quality & Security Testing', desc: 'Rigorous automated unit testing, end-to-end user testing, and security audits.' },
        { step: '06', title: 'Cloud Deployment', desc: 'Zero-downtime deployment setup on AWS, Azure, GCP, or Render servers.' },
        { step: '07', title: 'SLA Maintenance & Support', desc: 'Ongoing telemetry monitoring, optimization updates, and SLA support.' }
    ];

    const faqs = [
        {
            q: 'What types of software services does DSofts IT Services specialize in?',
            a: 'DSofts specializes in full-stack web application development (React, Node.js), native cross-platform mobile apps (Flutter), custom CRM and SaaS platforms, API integrations, and cloud infrastructure deployment.'
        },
        {
            q: 'How does DSofts handle project timelines and communication?',
            a: 'We operate using transparent agile sprints. You receive regular milestone updates, live staging environments to preview progress, and dedicated Slack/Teams channels for direct engineering communication.'
        },
        {
            q: 'Can DSofts build custom web and mobile apps for early-stage startups?',
            a: 'Yes. We specialize in engineering launch-ready MVPs for growing startups with scalable backend architectures designed for rapid iteration.'
        },
        {
            q: 'How can I get started on a project with DSofts?',
            a: 'Simply click "Start a Project" or navigate to our Contact page to fill out your project outline. Our engineering team will review your requirements and schedule an initial technical consultation.'
        }
    ];

    return (
        <div className="overflow-hidden">
            <SEO
                title="Home"
                description="DSofts IT Services - Building Digital Products That Move Businesses Forward. Web applications, mobile apps, custom software, and digital solutions."
            />

            {/* 1. Announcement Bar & 2. Premium Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-12 pb-20 overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:32px_32px]"></div>

                <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-7 space-y-6"
                    >
                        {/* Announcement Bar */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Available for new client projects & digital transformation</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading leading-tight tracking-tight">
                            DSofts IT Services
                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-primary-400 to-indigo-400">
                                Building Digital Products That Move Businesses Forward.
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 font-light max-w-xl leading-relaxed">
                            Web applications, mobile apps, custom software, and digital solutions engineered for growing startups and forward-thinking enterprises.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/contact" className="btn btn-primary text-base px-8 py-3.5 shadow-lg shadow-primary-600/30">
                                Start a Project
                            </Link>
                            <Link to="/portfolio" className="btn btn-outline text-base px-8 py-3.5 border-slate-700 hover:border-slate-500">
                                Explore Our Work
                            </Link>
                        </div>
                    </motion.div>

                    {/* Interactive Code / Dashboard Preview Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 relative hidden lg:block"
                    >
                        <div className="relative z-10 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                </div>
                                <span className="text-xs font-mono text-slate-500">dsofts-architecture.ts</span>
                            </div>

                            <div className="font-mono text-xs text-slate-300 space-y-2 leading-relaxed">
                                <div><span className="text-purple-400">interface</span> <span className="text-amber-300">SoftwarePlatform</span> {'{'}</div>
                                <div className="pl-4"><span className="text-sky-300">company:</span> <span className="text-emerald-400">'DSofts IT Services'</span>;</div>
                                <div className="pl-4"><span className="text-sky-300">standards:</span> <span className="text-emerald-400">'Enterprise Grade'</span>;</div>
                                <div className="pl-4"><span className="text-sky-300">techStack:</span> [<span className="text-emerald-400">'React'</span>, <span className="text-emerald-400">'Node'</span>, <span className="text-emerald-400">'Flutter'</span>, <span className="text-emerald-400">'Cloud'</span>];</div>
                                <div className="pl-4"><span className="text-sky-300">uptime:</span> <span className="text-amber-400">99.99</span>;</div>
                                <div>{'}'}</div>
                                <div className="pt-2 text-slate-500">// Engineering scalable products</div>
                                <div className="text-sky-400">export const <span className="text-white">deliverProject</span> = <span className="text-amber-300">async</span> () =&gt; {'{'} ... {'}'}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Company Introduction & Statistics */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} className="p-4 border-r border-slate-100 last:border-0 transition-transform">
                            <div className="text-3xl md:text-5xl font-black font-heading text-slate-900 mb-1">30+</div>
                            <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">Projects Delivered</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="p-4 border-r border-slate-100 last:border-0 transition-transform">
                            <div className="text-3xl md:text-5xl font-black font-heading text-primary-600 mb-1">95%</div>
                            <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">Client Satisfaction</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="p-4 border-r border-slate-100 last:border-0 transition-transform">
                            <div className="text-3xl md:text-5xl font-black font-heading text-slate-900 mb-1">Expert</div>
                            <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">Engineering Team</div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="p-4 transition-transform">
                            <div className="text-3xl md:text-5xl font-black font-heading text-primary-600 mb-1">3+</div>
                            <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">Years Experience</div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 4. Services Overview */}
            <section className="py-20 bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest bg-primary-50 px-3.5 py-1.5 rounded-full border border-primary-100">
                            Core Capabilities
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900">
                            Engineering Expertise Tailored to Your Growth
                        </h2>
                        <p className="text-slate-600 text-sm md:text-base">
                            From concept discovery to cloud deployment, DSofts IT Services provides full lifecycle digital software engineering.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.slice(0, 6).map((service, index) => (
                            <motion.div
                                key={service._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        {getIcon(service.title)}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">{service.title}</h3>
                                    <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                                        {service.description}
                                    </p>
                                </div>

                                <Link to="/services" className="text-primary-600 font-semibold text-xs flex items-center gap-1.5 hover:gap-2.5 transition-all">
                                    <span>Explore Service Details</span>
                                    <FiArrowRight />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/services" className="btn btn-secondary py-3 px-8 text-sm">
                            View All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Technology Stack */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900">
                            Our Modern Technology Stack
                        </h2>
                        <p className="text-slate-600 text-sm">
                            We use industry-proven frameworks, languages, and cloud services to guarantee speed, security, and long-term maintainability.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {techStack.map((tech, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-xs hover:border-primary-400 hover:bg-primary-50/50 transition-colors"
                            >
                                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                                <span>{tech.name}</span>
                                <span className="text-[10px] text-slate-400 font-normal">({tech.category})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Featured Work & 8. Case Studies Preview */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                        <div>
                            <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Portfolio & Case Studies</span>
                            <h2 className="text-3xl md:text-4xl font-bold font-heading mt-1">Featured Deliverables</h2>
                        </div>
                        <Link to="/portfolio" className="text-primary-400 hover:text-primary-300 font-semibold text-sm flex items-center gap-1">
                            <span>View Complete Portfolio</span>
                            <FiArrowRight />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProjects.map((project, index) => (
                            <div key={project._id || index} className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/80 shadow-xl group">
                                <div className="h-48 overflow-hidden bg-slate-950">
                                    <img
                                        src={project.thumbnailImageUrl || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80'}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 space-y-3">
                                    <h3 className="text-xl font-bold font-heading text-white">{project.title}</h3>
                                    <p className="text-slate-300 text-xs line-clamp-2">{project.shortDescription}</p>
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {project.techStack?.slice(0, 3).map((t, i) => (
                                            <span key={i} className="text-[11px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Development Process */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                        <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest bg-primary-50 px-3.5 py-1.5 rounded-full">
                            Structured Delivery
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900">
                            Our 7-Step Software Development Process
                        </h2>
                        <p className="text-slate-600 text-sm">
                            A battle-tested engineering methodology that guarantees quality, transparency, and timely launch.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {developmentSteps.map((s, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative space-y-3 shadow-xs">
                                <span className="text-3xl font-black font-heading text-primary-600/30 block">{s.step}</span>
                                <h3 className="text-lg font-bold text-slate-900 font-heading">{s.title}</h3>
                                <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. Client Testimonials */}
            <HappyClients />

            {/* 13. Careers Preview */}
            <section className="py-16 bg-slate-950 text-white">
                <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-3 max-w-xl">
                        <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest">Join Our Team</span>
                        <h2 className="text-3xl font-bold font-heading">Build Your Career at DSofts IT Services</h2>
                        <p className="text-slate-300 text-sm">We are always looking for talented developers, designers, and project managers to join our team.</p>
                    </div>
                    <Link to="/careers" className="btn btn-primary py-3 px-8 text-sm whitespace-nowrap">
                        View Open Careers
                    </Link>
                </div>
            </section>

            {/* 14. FAQ Accordion Section */}
            <section className="py-20 bg-slate-50">
                <div className="container-custom max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-heading text-slate-900 mb-3">Frequently Asked Questions</h2>
                        <p className="text-slate-600 text-sm">Answers to common questions about partnering with DSofts IT Services.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                    className="w-full p-5 text-left font-bold text-slate-900 flex justify-between items-center text-sm font-heading hover:bg-slate-50"
                                >
                                    <span>{faq.q}</span>
                                    <FiChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === i && (
                                    <div className="p-5 pt-0 text-slate-600 text-xs leading-relaxed border-t border-slate-100">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 15. Dynamic CTA Section */}
            <section className="py-20 bg-slate-900 text-white text-center relative overflow-hidden">
                <div className="container-custom relative z-10 max-w-3xl space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black font-heading">Ready to Move Your Business Forward?</h2>
                    <p className="text-slate-300 text-base leading-relaxed">
                        Let's discuss your project goals, technology needs, and timeline with DSofts IT Services engineering team.
                    </p>
                    <div className="pt-4">
                        <Link to="/contact" className="btn btn-primary text-base px-8 py-4 shadow-xl shadow-primary-900/40">
                            Start a Project Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
