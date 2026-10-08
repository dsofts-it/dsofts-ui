import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiCode, FiSmartphone, FiGlobe, FiServer, FiLayout, FiCpu, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { publicApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

const FALLBACK_SERVICES = [
    {
        _id: 's-1',
        title: 'Custom Web & Software Development',
        description: 'Tailored, high-performance web applications engineered with modern technologies (React, Node.js, Next.js) tailored for all business fields.',
        startingPrice: 25000,
        features: [
            'Responsive & Mobile-First UI/UX',
            'RESTful & GraphQL API Integration',
            'Custom Database Schemas & Optimization',
            'Secure Auth & Role-Based Access Control',
            'Cloud Deployment (AWS/Azure/Render)',
            'High Performance & SEO Optimization'
        ],
        isPopular: true
    },
    {
        _id: 's-2',
        title: 'Mobile App Development (iOS & Android)',
        description: 'Cross-platform native-feel mobile applications for iOS and Android using Flutter and React Native, tailored for Healthcare, Education, MLM, Finance, and Enterprise.',
        startingPrice: 35000,
        features: [
            'iOS & Android Cross-Platform Apps',
            'Flutter & React Native Architecture',
            'Real-time Push Notifications & Biometrics',
            'In-App Payment Gateway Integrations',
            'App Store & Google Play Store Publishing'
        ],
        isPopular: true
    },
    {
        _id: 's-3',
        title: 'Healthcare & Telemedicine Systems',
        description: 'HIPAA-compliant healthcare platforms, electronic health records (EHR), patient portals, appointment scheduling, and telemedicine video consultation apps.',
        startingPrice: 45000,
        features: [
            'Patient Registration & EHR Records',
            'Doctor Appointment & Video Consultations',
            'Lab & Prescription Management',
            'HIPAA & Health Data Privacy Standards',
            'Billing & Medical Insurance Integration'
        ],
        isPopular: true
    },
    {
        _id: 's-4',
        title: 'EdTech & Education Management Systems',
        description: 'Comprehensive Learning Management Systems (LMS), school management platforms, student portals, online examination systems, and interactive educational apps.',
        startingPrice: 30000,
        features: [
            'Student & Teacher Management Portals',
            'Live Online Classes & Video Streaming',
            'Course Catalog & Online Assessments',
            'Fee Collection & Attendance Telemetry',
            'Parent Communication Mobile Apps'
        ],
        isPopular: false
    },
    {
        _id: 's-5',
        title: 'MLM Systems & Network Marketing Software',
        description: 'Custom Multi-Level Marketing (MLM) software supporting Binary, Matrix, Generation, and Unilevel plans with automated payout calculators and genealogy trees.',
        startingPrice: 38000,
        features: [
            'Binary, Matrix, Unilevel & Custom MLM Plans',
            'Real-time Interactive Genealogy Trees',
            'Automated Payout & Commission Engine',
            'E-Wallet & Crypto/UPI Payment Gateway',
            'Member Backoffice & Admin Control Panel'
        ],
        isPopular: true
    },
    {
        _id: 's-6',
        title: 'FinTech & Finance Management Solutions',
        description: 'Secure financial software, payment gateway aggregators, micro-finance tracking, accounting dashboards, and banking mobile applications.',
        startingPrice: 42000,
        features: [
            'Multi-Currency Payment Gateways',
            'Biometric Security & Encryption',
            'Automated Ledger & Invoicing Systems',
            'Loan Management & Interest Calculators',
            'Real-time Financial Telemetry Dashboards'
        ],
        isPopular: true
    },
    {
        _id: 's-7',
        title: 'Enterprise CRM & ERP Systems',
        description: 'Fully customized CRM and ERP systems designed around your unique business workflows, lead tracking, inventory management, and automated sales pipelines.',
        startingPrice: 32000,
        features: [
            'Sales Pipeline & Lead Tracking',
            'Automated Business Workflow Engines',
            'Inventory & Supply Chain Telemetry',
            'Granular Role-based Employee Access',
            'Custom Analytics & Exportable Reports'
        ],
        isPopular: false
    },
    {
        _id: 's-8',
        title: 'AI & Smart Automation Solutions',
        description: 'Custom AI integration, intelligent chatbots, predictive analytics, process automation, and machine learning models for growing businesses.',
        startingPrice: 40000,
        features: [
            'AI Customer Support Chatbots',
            'Automated Document Processing',
            'Predictive Business Analytics',
            'Custom LLM & API Integrations'
        ],
        isPopular: false
    }
];

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await publicApi.getServices();
                if (response.data && response.data.length > 0) {
                    setServices(response.data);
                } else {
                    setServices(FALLBACK_SERVICES);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
                setServices(FALLBACK_SERVICES);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const getIcon = (title) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('web')) return <FiGlobe className="w-6 h-6" />;
        if (lowerTitle.includes('mobile') || lowerTitle.includes('app')) return <FiSmartphone className="w-6 h-6" />;
        if (lowerTitle.includes('backend') || lowerTitle.includes('api')) return <FiServer className="w-6 h-6" />;
        if (lowerTitle.includes('ui') || lowerTitle.includes('design')) return <FiLayout className="w-6 h-6" />;
        if (lowerTitle.includes('ai')) return <FiCpu className="w-6 h-6" />;
        return <FiCode className="w-6 h-6" />;
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <SEO
                title="Our Services"
                description="Explore DSofts IT Services software development capabilities - Web Apps, Mobile Apps, Custom CRM, Full-Stack Engineering, Cloud, and AI."
            />

            {/* Header */}
            <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="container-custom text-center max-w-4xl mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 font-semibold text-xs uppercase tracking-widest border border-primary-500/20 mb-6">
                        End-to-End Product Engineering
                    </span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold font-heading mb-6"
                    >
                        Our Services & Expertise
                    </motion.h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light">
                        Tailored software solutions engineered with high-performance architectures to solve complex business challenges.
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container-custom py-16">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-80 bg-white rounded-2xl border border-slate-200 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                            {getIcon(service.title)}
                                        </div>
                                        {service.isPopular && (
                                            <span className="text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                                Popular Choice
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">{service.title}</h3>
                                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {service.features && service.features.length > 0 && (
                                        <ul className="space-y-2.5 mb-8 border-t border-slate-100 pt-6">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                                                    <FiCheck className="mt-0.5 text-emerald-600 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                                    <span className="text-xs font-semibold text-slate-500">
                                        {service.startingPrice ? `Starting at ₹${Number(service.startingPrice).toLocaleString('en-IN')}` : 'Custom Pricing'}
                                    </span>
                                    <Link
                                        to={`/contact?service=${encodeURIComponent(service.title)}`}
                                        className="btn btn-primary py-2 px-4 text-xs gap-1.5"
                                    >
                                        <span>Request Quote</span>
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

export default Services;
