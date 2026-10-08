import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { publicApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

const CaseStudies = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const res = await publicApi.getCaseStudies();
                setCaseStudies(res.data || []);
            } catch (err) {
                console.error('Failed to load case studies:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudies();
    }, []);

    return (
        <div className="pb-20">
            <SEO
                title="Case Studies"
                description="Explore detailed case studies of digital product engineering projects delivered by DSofts IT Services."
            />

            <section className="py-10 bg-white">
                <div className="container-custom">
                    <div className="mb-10 text-center max-w-3xl mx-auto">
                        <span className="inline-block px-3.5 py-1 rounded-full bg-primary-50 text-primary-700 font-semibold text-xs uppercase tracking-wider mb-3">
                            Client Success Stories
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-heading mb-4">
                            In-Depth Engineering Case Studies
                        </h1>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                            See how DSofts IT Services solves complex technical challenges and delivers measurable commercial outcomes.
                        </p>
                    </div>
                    {loading ? (
                        <div className="space-y-8">
                            {[1, 2].map((i) => (
                                <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : caseStudies.length === 0 ? (
                        <div className="text-center py-16 bg-slate-50 rounded-2xl">
                            <Sparkles className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Case Studies Coming Soon</h3>
                            <p className="text-slate-600 max-w-md mx-auto mb-6">
                                We are actively documenting our latest client success stories. Contact us to learn more about our past project deliverables.
                            </p>
                            <Link to="/contact" className="btn btn-primary py-2.5 px-6">
                                Contact Engineering Team
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {caseStudies.map((study, idx) => (
                                <motion.div
                                    key={study._id || idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
                                >
                                    <div className="lg:col-span-5 relative min-h-[280px]">
                                        <img
                                            src={study.bannerImage || 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&auto=format&fit=crop&q=80'}
                                            alt={study.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            {study.industry || 'Tech Solution'}
                                        </div>
                                    </div>
                                    <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
                                        <div>
                                            <div className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">
                                                Client: {study.client || 'Enterprise Partner'}
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 font-heading">
                                                {study.title}
                                            </h2>
                                            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                                {study.summary}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {study.techStack?.map((t, tIdx) => (
                                                    <span key={tIdx} className="bg-white border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                                            <div className="text-xs text-slate-500 font-medium">
                                                Outcome: <span className="text-slate-800 font-semibold">{study.outcome?.substring(0, 50)}...</span>
                                            </div>
                                            <Link
                                                to={`/case-studies/${study.slug}`}
                                                className="btn btn-primary py-2 px-4 text-xs gap-2"
                                            >
                                                <span>Read Full Case Study</span>
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CaseStudies;
