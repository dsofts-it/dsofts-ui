import { motion } from 'framer-motion';
import { ShoppingBag, Landmark, HeartPulse, Building2, GraduationCap, Rocket, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import SEO from '../components/common/SEO';
import { Link } from 'react-router-dom';

const Solutions = () => {
    const industries = [
        {
            icon: <Rocket className="w-8 h-8 text-primary-600" />,
            title: 'Startups & MVP Engineering',
            description: 'Turn innovative ideas into market-ready MVPs with speed, clean architecture, and rapid user feedback loops.',
            features: ['Fast MVP Prototyping', 'Scalable Cloud Architecture', 'Investor-Ready Tech Demos']
        },
        {
            icon: <ShoppingBag className="w-8 h-8 text-primary-600" />,
            title: 'E-commerce & Retail Solutions',
            description: 'Custom digital store fronts, inventory automation, secure payment checkout systems, and real-time sales telemetry.',
            features: ['Custom Checkout Flow', 'Inventory Management API', 'Multi-currency Payments']
        },
        {
            icon: <Landmark className="w-8 h-8 text-primary-600" />,
            title: 'FinTech & Banking Apps',
            description: 'Secure financial portals, transaction processing systems, loan management workflows, and biometric login apps.',
            features: ['Biometric Auth', 'Encrypted REST Endpoints', 'PCI-DSS Compliance Support']
        },
        {
            icon: <HeartPulse className="w-8 h-8 text-primary-600" />,
            title: 'Healthcare & Telemedicine',
            description: 'Hospital portals, patient scheduling systems, digital medical records (EHR), and HIPAA-oriented software.',
            features: ['Patient Care Portals', 'Doctor Appointment Engine', 'Secure Record Storage']
        },
        {
            icon: <Building2 className="w-8 h-8 text-primary-600" />,
            title: 'Real Estate Platforms',
            description: 'Interactive property discovery engines, CRM leads routing, virtual 360 tour integrations, and agent portals.',
            features: ['Property Listings', 'Lead CRM Integration', 'Interactive Map Filtering']
        },
        {
            icon: <GraduationCap className="w-8 h-8 text-primary-600" />,
            title: 'Education & EdTech Apps',
            description: 'Interactive Learning Management Systems (LMS), online classroom video tools, student portals, and course engines.',
            features: ['Course Management', 'Student Progress Analytics', 'Live Stream Integration']
        }
    ];

    return (
        <div className="pb-20">
            <SEO
                title="Industry Solutions"
                description="Tailored software and product development solutions for Startups, E-commerce, FinTech, Healthcare, Real Estate, and Education."
            />

            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 font-semibold text-xs uppercase tracking-widest border border-primary-500/20 mb-6">
                        Tailored Technology Solutions
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
                        Engineered for Your Industry's Specific Challenges.
                    </h1>
                    <p className="text-lg text-slate-300 font-light max-w-2xl mx-auto">
                        Whether launch-ready MVPs for startups or high-load transactional enterprise apps, DSofts IT Services builds tailored solutions optimized for performance.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industries.map((ind, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-slate-50 border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 group"
                            >
                                <div className="p-3 bg-white border border-slate-100 rounded-xl w-fit mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    {ind.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">{ind.title}</h3>
                                <p className="text-slate-600 text-sm mb-6 leading-relaxed">{ind.description}</p>

                                <div className="space-y-2 pt-4 border-t border-slate-200/60 mb-6">
                                    {ind.features.map((feat, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                                            <ShieldCheck size={14} className="text-primary-600" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
                                >
                                    <span>Discuss Solution</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-primary-950 text-white">
                <div className="container-custom text-center max-w-3xl">
                    <h2 className="text-3xl font-bold mb-4 font-heading">Need a Specialized Solution?</h2>
                    <p className="text-slate-300 mb-8">Our engineering team designs custom workflows according to your unique enterprise requirements.</p>
                    <Link to="/contact" className="btn btn-primary py-3 px-8 text-base">
                        Get Custom Solution Proposal
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Solutions;
