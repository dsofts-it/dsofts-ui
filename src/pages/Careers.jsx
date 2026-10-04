import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, Upload, CheckCircle2, AlertCircle, X, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { publicApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedJob, setSelectedJob] = useState(null);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    // Form state
    const initialFormState = {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        qualification: '',
        experienceYears: 'Fresher (0 Years)',
        noticePeriod: 'NA',
        skills: '',
        portfolioUrl: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    const [resumeFile, setResumeFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await publicApi.getJobs();
            setJobs(res.data || []);
        } catch (err) {
            console.error('Error fetching jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    const departments = ['All', ...new Set(jobs.map((j) => j.department).filter(Boolean))];

    const filteredJobs = selectedDepartment === 'All'
        ? jobs
        : jobs.filter((j) => j.department === selectedDepartment);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const allowedExts = ['.pdf', '.doc', '.docx'];
        const fileName = file.name.toLowerCase();

        const isExtValid = allowedExts.some(ext => fileName.endsWith(ext));
        const isMimeValid = allowedTypes.includes(file.type);

        if (!isExtValid && !isMimeValid) {
            setErrorMsg('Invalid file format. Only PDF, DOC, and DOCX files are allowed.');
            setResumeFile(null);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrorMsg('File size exceeds 5MB limit.');
            setResumeFile(null);
            return;
        }

        setErrorMsg('');
        setResumeFile(file);
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!resumeFile) {
            setErrorMsg('Please upload your resume (PDF, DOC, or DOCX format).');
            return;
        }

        setSubmitting(true);

        try {
            const data = new FormData();
            data.append('jobId', selectedJob._id);
            data.append('resume', resumeFile);

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            const res = await publicApi.submitJobApplication(data);
            setSuccessMsg(res.data?.message || 'Application submitted successfully!');
            
            // Reset form
            setFormData(initialFormState);
            setResumeFile(null);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to submit application. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <SEO
                title="Careers Portal"
                description="Explore career opportunities at DSofts IT Services. Build modern web, mobile, and enterprise digital solutions with our expert engineering team."
            />

            {/* Careers Hero */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 font-semibold text-xs uppercase tracking-widest border border-primary-500/20 mb-6">
                        Join DSofts Engineering
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
                        Build Your Future With Us
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                        At DSofts IT Services, we foster a collaborative, engineering-first culture. Work on modern React, Node, Flutter, and Cloud tech stacks alongside passionate teammates.
                    </p>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16">
                <div className="container-custom max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 font-heading">Current Openings</h2>
                            <p className="text-slate-600 text-sm">Explore active career opportunities and apply directly.</p>
                        </div>

                        {/* Department Filters */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                            <Filter size={16} className="text-slate-400 flex-shrink-0" />
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDepartment(dept)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                                        selectedDepartment === dept
                                            ? 'bg-primary-600 text-white shadow-sm'
                                            : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                                    }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-32 bg-white rounded-2xl border border-slate-200 animate-pulse"></div>
                            ))}
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
                            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-800 mb-2 font-heading">No Active Openings Found</h3>
                            <p className="text-slate-600 text-sm max-w-md mx-auto">
                                There are currently no openings listed under this department. Check back soon or send your resume to dsofts.itservices@gmail.com!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job._id}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                                >
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-2.5 py-0.5 rounded-md">
                                                {job.department}
                                            </span>
                                            <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-0.5 rounded-md">
                                                {job.workType || 'Full-time'}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 font-heading">{job.title}</h3>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} className="text-slate-400" />
                                                <span>{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} className="text-slate-400" />
                                                <span>Experience: {job.experience}</span>
                                            </div>
                                            {job.salary && (
                                                <div className="flex items-center gap-1 text-slate-700 font-semibold">
                                                    <DollarSign size={14} className="text-emerald-600" />
                                                    <span>{job.salary}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <button
                                            onClick={() => {
                                                setSelectedJob(job);
                                                setIsApplyModalOpen(true);
                                                setSuccessMsg('');
                                                setErrorMsg('');
                                            }}
                                            className="btn btn-primary py-2.5 px-6 text-sm w-full md:w-auto justify-center"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Application Modal */}
            <AnimatePresence>
                {isApplyModalOpen && selectedJob && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                        >
                            {/* Modal Header */}
                            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
                                <div>
                                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                                        Applying for {selectedJob.department}
                                    </span>
                                    <h2 className="text-2xl font-bold text-slate-900 font-heading">{selectedJob.title}</h2>
                                    <p className="text-xs text-slate-500 mt-1">{selectedJob.location} • {selectedJob.workType}</p>
                                </div>
                                <button
                                    onClick={() => setIsApplyModalOpen(false)}
                                    className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 space-y-8">
                                {/* Success Banner */}
                                {successMsg ? (
                                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-3">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                                        <h3 className="text-xl font-bold font-heading">Application Submitted!</h3>
                                        <p className="text-sm">{successMsg}</p>
                                        <button
                                            onClick={() => setIsApplyModalOpen(false)}
                                            className="btn btn-primary py-2 px-6 text-sm mt-4"
                                        >
                                            Close Window
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmitApplication} className="space-y-6">
                                        {errorMsg && (
                                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 text-sm">
                                                <AlertCircle size={18} className="flex-shrink-0" />
                                                <span>{errorMsg}</span>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    placeholder="Full Name"
                                                    className="input-field text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="Email"
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
                                                    placeholder="Number"
                                                    className="input-field text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Location</label>
                                                <input
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    placeholder="Enter Location"
                                                    className="input-field text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Experience *</label>
                                                <select
                                                    value={formData.experienceYears}
                                                    onChange={(e) => {
                                                        const exp = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            experienceYears: exp,
                                                            noticePeriod: exp.includes('Fresher') ? 'NA' : (prev.noticePeriod === 'NA' ? '30 Days' : prev.noticePeriod)
                                                        }));
                                                    }}
                                                    className="input-field text-sm"
                                                >
                                                    <option value="Fresher (0 Years)">Fresher (0 Years)</option>
                                                    <option value="1 Year">1 Year</option>
                                                    <option value="2 Years">2 Years</option>
                                                    <option value="3+ Years">3+ Years</option>
                                                    <option value="5+ Years">5+ Years</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Period *</label>
                                                <select
                                                    value={formData.noticePeriod}
                                                    onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                                                    className="input-field text-sm"
                                                >
                                                    <option value="NA">NA (Fresher / Not Applicable)</option>
                                                    <option value="Immediate">Immediate</option>
                                                    <option value="15 Days">15 Days</option>
                                                    <option value="30 Days">30 Days</option>
                                                    <option value="60 Days">60 Days</option>
                                                    <option value="90 Days">90 Days</option>
                                                </select>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-slate-700 mb-1">Github Url</label>
                                                <input
                                                    type="url"
                                                    value={formData.portfolioUrl}
                                                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                                                    placeholder="https://github.com"
                                                    className="input-field text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">Key Skills & Technologies *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.skills}
                                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                                placeholder="React, Node.js, Express, MongoDB, Flutter, etc."
                                                className="input-field text-sm"
                                            />
                                        </div>

                                        {/* Resume File Upload */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                Resume Document (PDF/DOC/DOCX, Max 5MB) *
                                            </label>
                                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-primary-500 transition-colors bg-slate-50">
                                                <input
                                                    type="file"
                                                    id="resumeUpload"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                <label htmlFor="resumeUpload" className="cursor-pointer space-y-2 block">
                                                    <Upload className="w-8 h-8 text-primary-600 mx-auto" />
                                                    <div className="text-sm font-semibold text-slate-700">
                                                        {resumeFile ? resumeFile.name : 'Click to upload your resume'}
                                                    </div>
                                                    <p className="text-xs text-slate-500">Supports PDF, DOC, DOCX up to 5MB</p>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                            <button
                                                type="button"
                                                onClick={() => setIsApplyModalOpen(false)}
                                                className="btn btn-secondary py-2.5 px-6 text-sm"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="btn btn-primary py-2.5 px-8 text-sm disabled:opacity-50"
                                            >
                                                {submitting ? 'Submitting Application...' : 'Submit Application'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Careers;
