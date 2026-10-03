import { useState, useEffect } from 'react';
import { Download, Eye, Trash2, Edit3, Filter, FileText, X, CheckCircle } from 'lucide-react';
import { adminApi } from '../../api/endpoints';

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [activeAppModal, setActiveAppModal] = useState(null);
    const [internalNotes, setInternalNotes] = useState('');
    const [appStatus, setAppStatus] = useState('New');

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await adminApi.getApplications();
            setApplications(res.data || []);
        } catch (err) {
            console.error('Failed to fetch applications:', err);
        } finally {
            setLoading(false);
        }
    };

    const statuses = ['All', 'New', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

    const filteredApps = selectedStatus === 'All'
        ? applications
        : applications.filter(a => a.status === selectedStatus);

    const handleOpenDetailModal = (app) => {
        setActiveAppModal(app);
        setAppStatus(app.status || 'New');
        setInternalNotes(app.internalNotes || '');
    };

    const handleUpdateStatusAndNotes = async () => {
        if (!activeAppModal) return;
        try {
            await adminApi.updateApplicationStatus(activeAppModal._id, {
                status: appStatus,
                internalNotes: internalNotes
            });
            setActiveAppModal(null);
            fetchApplications();
        } catch (err) {
            alert('Failed to update application');
        }
    };

    const handleDownloadResume = async (appId, fileName) => {
        try {
            const res = await adminApi.downloadResume(appId);
            const blob = new Blob([res.data], { type: res.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName || 'Resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert('Could not download resume file.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete candidate application record permanently?')) return;
        try {
            await adminApi.deleteApplication(id);
            fetchApplications();
        } catch (err) {
            alert('Failed to delete application.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading">Candidate Job Applications</h2>
                    <p className="text-xs text-slate-500">Review candidate profiles, download resumes, and update recruitment status.</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                    <Filter size={16} className="text-slate-400" />
                    {statuses.map((st) => (
                        <button
                            key={st}
                            onClick={() => setSelectedStatus(st)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                                selectedStatus === st
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                        >
                            {st}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="p-8 text-center text-slate-400">Loading applications...</div>
            ) : filteredApps.length === 0 ? (
                <div className="bg-white p-8 text-center rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-600">No applications found matching "{selectedStatus}".</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                                <tr>
                                    <th className="p-4">Candidate</th>
                                    <th className="p-4">Applied Job</th>
                                    <th className="p-4">Contact</th>
                                    <th className="p-4">Experience</th>
                                    <th className="p-4">Applied Date</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredApps.map((app) => (
                                    <tr key={app._id} className="hover:bg-slate-50/50">
                                        <td className="p-4">
                                            <div className="font-bold text-slate-900">{app.fullName}</div>
                                            <div className="text-[11px] text-slate-400">{app.location}</div>
                                        </td>
                                        <td className="p-4 font-semibold text-primary-700">{app.jobTitle}</td>
                                        <td className="p-4">
                                            <div>{app.email}</div>
                                            <div className="text-slate-400">{app.phone}</div>
                                        </td>
                                        <td className="p-4 text-slate-600">{app.experienceYears || 'N/A'}</td>
                                        <td className="p-4 text-slate-500">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary-50 text-primary-700 border border-primary-100">
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => handleDownloadResume(app._id, app.originalFileName)}
                                                title="Download Resume"
                                                className="p-1.5 text-slate-600 hover:text-primary-600 hover:bg-slate-100 rounded-lg"
                                            >
                                                <Download size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleOpenDetailModal(app)}
                                                title="View & Edit Application"
                                                className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                            >
                                                <Eye size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(app._id)}
                                                title="Delete Record"
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

            {/* Application Detail & Status Edit Modal */}
            {activeAppModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                            <div>
                                <span className="text-[11px] font-bold text-primary-600 uppercase">Candidate Profile</span>
                                <h3 className="text-xl font-bold font-heading">{activeAppModal.fullName}</h3>
                            </div>
                            <button onClick={() => setActiveAppModal(null)}><X size={20} /></button>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div><span className="font-semibold text-slate-400">Target Job:</span> <div className="font-bold text-slate-900">{activeAppModal.jobTitle}</div></div>
                                <div><span className="font-semibold text-slate-400">Email:</span> <div className="font-bold text-slate-900">{activeAppModal.email}</div></div>
                                <div><span className="font-semibold text-slate-400">Phone:</span> <div className="font-bold text-slate-900">{activeAppModal.phone}</div></div>
                                <div><span className="font-semibold text-slate-400">Location:</span> <div className="font-bold text-slate-900">{activeAppModal.location || 'N/A'}</div></div>
                                <div><span className="font-semibold text-slate-400">Experience:</span> <div className="font-bold text-slate-900">{activeAppModal.experienceYears || 'N/A'}</div></div>
                                <div><span className="font-semibold text-slate-400">Notice Period:</span> <div className="font-bold text-slate-900">{activeAppModal.noticePeriod || 'N/A'}</div></div>
                            </div>

                            {activeAppModal.skills && activeAppModal.skills.length > 0 && (
                                <div>
                                    <span className="font-semibold text-slate-700">Skills:</span>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {activeAppModal.skills.map((s, i) => (
                                            <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeAppModal.coverLetter && (
                                <div>
                                    <span className="font-semibold text-slate-700">Cover Letter:</span>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-1 text-slate-600 leading-relaxed whitespace-pre-line">
                                        {activeAppModal.coverLetter}
                                    </div>
                                </div>
                            )}

                            <div className="pt-2">
                                <button
                                    onClick={() => handleDownloadResume(activeAppModal._id, activeAppModal.originalFileName)}
                                    className="btn btn-secondary py-2 px-4 text-xs gap-2"
                                >
                                    <Download size={14} />
                                    <span>Download Candidate Resume ({activeAppModal.originalFileName || 'Resume.pdf'})</span>
                                </button>
                            </div>

                            <hr className="border-slate-100" />

                            <div className="space-y-4 pt-2">
                                <div>
                                    <label className="block font-semibold mb-1">Update Candidate Recruitment Status</label>
                                    <select
                                        value={appStatus}
                                        onChange={(e) => setAppStatus(e.target.value)}
                                        className="input-field"
                                    >
                                        {statuses.filter(s => s !== 'All').map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Internal Hiring Manager Notes</label>
                                    <textarea
                                        rows="3"
                                        value={internalNotes}
                                        onChange={(e) => setInternalNotes(e.target.value)}
                                        placeholder="Add internal evaluation feedback, interview notes, or comments..."
                                        className="input-field"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button onClick={() => setActiveAppModal(null)} className="btn btn-secondary py-2 px-4 text-xs">
                                        Close
                                    </button>
                                    <button onClick={handleUpdateStatusAndNotes} className="btn btn-primary py-2 px-6 text-xs">
                                        Save Status & Notes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminApplications;
