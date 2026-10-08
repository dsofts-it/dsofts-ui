import { motion } from 'framer-motion';
import { Shield, Target, Zap, Users, Code, Cpu, Award, CheckCircle2 } from 'lucide-react';
import SEO from '../components/common/SEO';
import { Link } from 'react-router-dom';

const About = () => {
    const stats = [
        { label: 'Projects Delivered', value: '30+' },
        { label: 'Client Satisfaction', value: '95%' },
        { label: 'Years Experience', value: '3+' },
        { label: 'Dedicated Team', value: 'Expert Team' },
    ];

    const values = [
        {
            icon: <Code className="w-6 h-6 text-primary-600" />,
            title: 'Technical Precision',
            description: 'We adhere to robust architectural standards, clean code practices, and rigorous code reviews to deliver scalable software.'
        },
        {
            icon: <Zap className="w-6 h-6 text-primary-600" />,
            title: 'Agile Velocity',
            description: 'Iterative development sprints ensure rapid feature deployment, transparent communication, and continuous delivery.'
        },
        {
            icon: <Shield className="w-6 h-6 text-primary-600" />,
            title: 'Security & Reliability',
            description: 'Enterprise-grade encryption, secure API protocols, and thorough vulnerability audits are baked into every layer.'
        },
        {
            icon: <Users className="w-6 h-6 text-primary-600" />,
            title: 'Client Partnership',
            description: 'We do not just build software; we align with your strategic business goals as dedicated technology partners.'
        }
    ];

    return (
        <div className="pb-20">
            <SEO
                title="About Us"
                description="Learn about DSofts IT Services - our mission, vision, engineering philosophy, and expert software product team."
            />

            {/* Clean Integrated Header directly at top */}
            <section className="py-10 bg-white">
                <div className="container-custom text-center max-w-4xl mx-auto">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-primary-50 text-primary-700 font-semibold text-xs uppercase tracking-wider mb-3">
                        About DSofts IT Services
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 font-heading leading-tight">
                        Engineering High-Performance Digital Solutions for Tomorrow
                    </h1>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                        DSofts IT Services is a modern technology consulting and product development engineering company. We partner with ambitious startups and enterprises to build fast, scalable, and secure software platforms.
                    </p>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-12 bg-primary-600 text-white shadow-md">
                <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((s, idx) => (
                        <div key={idx} className="p-4">
                            <div className="text-3xl md:text-5xl font-extrabold font-heading mb-1">{s.value}</div>
                            <div className="text-sm md:text-base font-medium text-primary-100">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white">
                <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wider">
                            <Target size={18} />
                            <span>Our Core Purpose</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">
                            Driven by Engineering Excellence and Client Growth
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Our mission is simple: eliminate complexity in digital transformation by delivering resilient, clean code and intuitive software architectures.
                        </p>
                        <ul className="space-y-3">
                            {[
                                'End-to-end full-stack web and mobile product engineering',
                                'Cloud-native architecture and high-throughput REST APIs',
                                'User-centric UI/UX design aligned with modern aesthetic standards',
                                'Transparent milestone reporting and post-deployment support'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700">
                                    <CheckCircle2 className="text-primary-600 w-5 h-5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl shadow-lg space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Our Mission</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                To empower businesses worldwide with robust, scalable digital tools that streamline operations and drive sustainable commercial success.
                            </p>
                        </div>
                        <hr className="border-slate-200" />
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Our Vision</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                To be recognized globally as a benchmark product development engineering agency praised for reliability, speed, and technical craftsmanship.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engineering Values */}
            <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">
                            Our Development Principles
                        </h2>
                        <p className="text-slate-600">
                            The standards that guide how we engineer every project at DSofts IT Services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                                    {v.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 font-heading">{v.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-slate-900 text-white text-center">
                <div className="container-custom max-w-3xl">
                    <h2 className="text-3xl font-bold mb-4 font-heading">Let's Build Something Remarkable</h2>
                    <p className="text-slate-300 mb-8">Ready to bring your digital product vision to life with DSofts IT Services?</p>
                    <Link to="/contact" className="btn btn-primary py-3 px-8 text-base">
                        Start a Conversation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
