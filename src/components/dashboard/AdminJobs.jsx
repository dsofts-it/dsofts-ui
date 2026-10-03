import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Clock, Briefcase, X } from 'lucide-react';
import { adminApi } from '../../api/endpoints';

const AdminJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);

    const [form, setForm] = useState({
        title: '',
        department: 'Engineering',
        location: 'Remote / Pune, India',
        workType: 'Full-time',
        experience: '2-4 Years',
        salary: '',
        description: '',
        responsibilities: '',
        requirements: '',
        skills: '',
        benefits: '',
        status: 'Published'
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await adminApi.getAllJobs();
            setJobs(res.data || []);
        } catch (err) {
            console.error('Failed to fetch admin jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (job = null) => {
        if (job) {
            setEditingJob(job);
            setForm({
                title: job.title || '',
                department: job.department || 'Engineering',
                location: job.location || '',
                workType: job.workType || 'Full-time',
                experience: job.experience || '',
                salary: job.salary || '',
                description: job.description || '',
                responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : (job.responsibilities || ''),
                requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
                skills: Array.isArray(job.skills) ? job.skills.join(', ') : (job.skills || ''),
                benefits: Array.isArray(job.benefits) ? job.benefits.join('\n') : (job.benefits || ''),
                status: job.status || 'Published'
            });
        } else {
            setEditingJob(null);
            setForm({
                title: '',
                department: 'Engineering',
                location: 'Remote / Pune, India',
                workType: 'Full-time',
                experience: '2-4 Years',
                salary: '',
                description: '',
                responsibilities: '',
                requirements: '',
                skills: '',
                benefits: '',
                status: 'Published'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingJob) {
                await adminApi.updateJob(editingJob._id, form);
            } else {
                await adminApi.createJob(form);
            }
            setIsModalOpen(false);
            fetchJobs();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save job');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job posting?')) return;
        try {
            await adminApi.deleteJob(id);
            fetchJobs();
        } catch (err) {
            alert('Failed to delete job');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading">Job Management</h2>
                    <p className="text-xs text-slate-500">Create and publish open career opportunities.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn btn-primary py-2 px-4 text-xs flex items-center gap-2"
                >
                    <Plus size={16} />
                    <span>Post New Job</span>
                </button>
            </div>

            {loading ? (
                <div className="p-8 text-center text-slate-400">Loading jobs...</div>
            ) : jobs.length === 0 ? (
                <div className="bg-white p-8 text-center rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-600">No jobs posted yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Department</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {jobs.map((j) => (
                                    <tr key={j._id} className="hover:bg-slate-50/50">
                                        <td className="p-4 font-bold text-slate-900">{j.title}</td>
                                        <td className="p-4 text-slate-600">{j.department}</td>
                                        <td className="p-4 text-slate-600">{j.location}</td>
                                        <td className="p-4 text-slate-600">{j.workType}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                j.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                                {j.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => handleOpenModal(j)}
                                                className="p-1.5 text-slate-600 hover:text-primary-600 hover:bg-slate-100 rounded-lg"
                                            >
                                                <Edit2 size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(j._id)}
                                                className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-bold font-heading">{editingJob ? 'Edit Job' : 'Create Job Opening'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Job Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Department *</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.department}
                                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Location</label>
                                    <input
                                        type="text"
                                        value={form.location}
                                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Work Type</label>
                                    <select
                                        value={form.workType}
                                        onChange={(e) => setForm({ ...form, workType: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Experience *</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.experience}
                                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Status</label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Salary / Compensation</label>
                                <input
                                    type="text"
                                    value={form.salary}
                                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Job Description *</label>
                                <textarea
                                    rows="3"
                                    required
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="input-field"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Responsibilities (One per line)</label>
                                <textarea
                                    rows="3"
                                    value={form.responsibilities}
                                    onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
                                    className="input-field"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Requirements (One per line)</label>
                                <textarea
                                    rows="3"
                                    value={form.requirements}
                                    onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                                    className="input-field"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Skills (Comma separated)</label>
                                <input
                                    type="text"
                                    value={form.skills}
                                    onChange={(e) => setForm({ ...form, skills: e.target.value })}
                                    className="input-field"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary py-2 px-4 text-xs">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary py-2 px-6 text-xs">
                                    Save Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminJobs;
