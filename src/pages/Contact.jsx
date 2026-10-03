import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { publicApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

const Contact = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const preselectedService = queryParams.get('service') || '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: preselectedService || 'Web Development',
        budget: '$2,500 - $5,000',
        timeline: '1 - 2 Months',
        message: ''
    });

    useEffect(() => {
        if (preselectedService) {
            setFormData(prev => ({ ...prev, service: preselectedService }));
        }
    }, [preselectedService]);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await publicApi.sendContactMessage(formData);
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service: 'Web Development',
                budget: '$2,500 - $5,000',
                timeline: '1 - 2 Months',
                message: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send message. Please try again or email us directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <SEO
                title="Contact Us"
                description="Get in touch with DSofts IT Services. Start a project, request a consultation, or talk to our software engineering team."
            />

            {/* Header */}
            <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="container-custom text-center max-w-4xl mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 font-semibold text-xs uppercase tracking-widest border border-primary-500/20 mb-6">
                        Start a Project
                    </span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold font-heading mb-6"
                    >
                        Let's Engineer Your Digital Vision.
                    </motion.h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light">
                        Have a new application concept, software requirement, or technical question? We are ready to help.
                    </p>
                </div>
            </div>

            <div className="container-custom py-16 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-xl font-bold text-slate-900 font-heading border-b border-slate-100 pb-4">
                                Contact Information
                            </h3>

                            <div className="space-y-6 text-sm text-slate-600">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-slate-400 uppercase">Direct Email</div>
                                        <a href="mailto:dsofts.itservices@gmail.com" className="font-bold text-slate-900 hover:text-primary-600 transition-colors">
                                            dsofts.itservices@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-slate-400 uppercase">Headquarters</div>
                                        <div className="font-bold text-slate-900">Pune, Maharashtra</div>
                                        <div className="text-xs text-slate-500">India</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-slate-400 uppercase">Response Time</div>
                                        <div className="font-bold text-slate-900">Within 24 Hours</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-md space-y-4">
                            <h4 className="text-lg font-bold font-heading">Need NDA Signed First?</h4>
                            <p className="text-slate-300 text-xs leading-relaxed">
                                We gladly execute non-disclosure agreements prior to reviewing proprietary project specifications.
                            </p>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">Project Request Form</h2>
                        <p className="text-slate-600 text-sm mb-8">Fill out the details below and we will prepare a tailored technical proposal.</p>

                        {success ? (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-4">
                                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                                <h3 className="text-2xl font-bold font-heading">Inquiry Received!</h3>
                                <p className="text-sm max-w-md mx-auto">
                                    Thank you for reaching out to DSofts IT Services. Our engineering lead will review your project details and respond within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="btn btn-primary py-2.5 px-6 text-xs"
                                >
                                    Send Another Request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 text-sm">
                                        <AlertCircle size={18} className="flex-shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Jane Smith"
                                            className="input-field text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="jane@company.com"
                                            className="input-field text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 9876543210"
                                            className="input-field text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            placeholder="Acme Tech Inc."
                                            className="input-field text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Required Service *</label>
                                        <select
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                            className="input-field text-sm"
                                        >
                                            <option value="Web Development">Web Development</option>
                                            <option value="Mobile App Development">Mobile App Development</option>
                                            <option value="Full Stack Development">Full Stack Development</option>
                                            <option value="Custom CRM / SaaS">Custom CRM / SaaS</option>
                                            <option value="AI Solutions">AI Solutions</option>
                                            <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                                            <option value="Other">Other / Consulting</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Budget</label>
                                        <select
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            className="input-field text-sm"
                                        >
                                            <option value="Under $2,500">Under $2,500</option>
                                            <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                            <option value="$10,000+">$10,000+</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Details & Requirements *</label>
                                    <textarea
                                        rows="5"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Describe the application features, target users, and key objectives..."
                                        className="input-field text-sm"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full py-3.5 text-sm gap-2 shadow-lg shadow-primary-600/20 disabled:opacity-50"
                                >
                                    <Send size={16} />
                                    <span>{loading ? 'Submitting Inquiry...' : 'Submit Project Request'}</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
