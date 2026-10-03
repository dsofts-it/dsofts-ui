import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldAlert, Cpu, Award } from 'lucide-react';
import { publicApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

const CaseStudyDetail = () => {
    const { slug } = useParams();
    const [study, setStudy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await publicApi.getCaseStudyBySlug(slug);
                setStudy(res.data);
            } catch (err) {
                console.error('Case study fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!study) {
        return (
            <div className="min-h-screen pt-32 pb-20 container-custom text-center">
                <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
                <p className="text-slate-600 mb-8">The requested case study could not be retrieved.</p>
                <Link to="/case-studies" className="btn btn-primary">Back to Case Studies</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <SEO
                title={study.title}
                description={study.summary}
            />

            <div className="container-custom max-w-4xl mx-auto">
                <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-primary-600 font-medium hover:underline mb-8">
                    <ArrowLeft size={16} />
                    <span>Back to all case studies</span>
                </Link>

                {/* Case Study Header */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm mb-10">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-primary-600 uppercase tracking-wider mb-4">
                        <span className="bg-primary-50 px-3 py-1 rounded-md">{study.industry}</span>
                        <span>•</span>
                        <span>Client: {study.client}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-heading leading-tight">
                        {study.title}
                    </h1>

                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        {study.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                        {study.techStack?.map((t, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-md">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Banner Image */}
                {study.bannerImage && (
                    <div className="rounded-2xl overflow-hidden shadow-md mb-10 max-h-[420px]">
                        <img src={study.bannerImage} alt={study.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 text-red-600 font-bold mb-4">
                            <ShieldAlert size={20} />
                            <h3 className="text-xl font-heading text-slate-900">The Problem</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{study.problem}</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold mb-4">
                            <CheckCircle2 size={20} />
                            <h3 className="text-xl font-heading text-slate-900">Our Solution</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{study.solution}</p>
                    </div>
                </div>

                {/* Development Process & Outcomes */}
                <div className="bg-slate-900 text-white p-8 md:p-10 rounded-2xl shadow-xl mb-10">
                    <div className="flex items-center gap-2 text-primary-400 font-bold text-sm uppercase tracking-wider mb-4">
                        <Award size={18} />
                        <span>Outcome & Deliverables</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-heading">Key Project Impact</h3>
                    <p className="text-slate-300 leading-relaxed text-base">{study.outcome}</p>
                </div>

                <div className="text-center pt-8">
                    <Link to="/contact" className="btn btn-primary py-3 px-8 text-base">
                        Start Similar Project With DSofts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CaseStudyDetail;
