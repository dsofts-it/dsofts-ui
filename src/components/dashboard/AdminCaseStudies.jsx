import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { adminApi, publicApi } from '../../api/endpoints';

const AdminCaseStudies = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [form, setForm] = useState({
        title: '',
        client: '',
        industry: '',
        summary: '',
        problem: '',
        solution: '',
        outcome: '',
        techStack: '',
        bannerImage: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await publicApi.getCaseStudies();
            setCaseStudies(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setForm({
                title: item.title || '',
                client: item.client || '',
                industry: item.industry || '',
                summary: item.summary || '',
                problem: item.problem || '',
                solution: item.solution || '',
                outcome: item.outcome || '',
                techStack: Array.isArray(item.techStack) ? item.techStack.join(', ') : '',
                bannerImage: item.bannerImage || ''
            });
        } else {
            setEditingItem(null);
            setForm({
                title: '',
                client: '',
                industry: '',
                summary: '',
                problem: '',
                solution: '',
                outcome: '',
                techStack: '',
                bannerImage: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await adminApi.updateCaseStudy(editingItem._id, form);
            } else {
                await adminApi.createCaseStudy(form);
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            alert('Failed to save case study.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this case study?')) return;
        try {
            await adminApi.deleteCaseStudy(id);
            fetchData();
        } catch (err) {
            alert('Failed to delete case study.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading">Case Studies Management</h2>
                    <p className="text-xs text-slate-500">Document in-depth technical engineering success stories.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="btn btn-primary py-2 px-4 text-xs flex items-center gap-2">
                    <Plus size={16} />
                    <span>Create Case Study</span>
                </button>
            </div>

            {loading ? (
                <div className="p-8 text-center text-slate-400">Loading case studies...</div>
            ) : caseStudies.length === 0 ? (
                <div className="bg-white p-8 text-center rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-600">No case studies documented yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                            <tr>
                                <th className="p-4">Title</th>
                                <th className="p-4">Client</th>
                                <th className="p-4">Industry</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {caseStudies.map((cs) => (
                                <tr key={cs._id} className="hover:bg-slate-50/50">
                                    <td className="p-4 font-bold text-slate-900">{cs.title}</td>
                                    <td className="p-4 text-slate-600">{cs.client}</td>
                                    <td className="p-4 text-slate-600">{cs.industry}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => handleOpenModal(cs)} className="p-1.5 text-slate-600 hover:text-primary-600 rounded">
                                            <Edit2 size={15} />
                                        </button>
                                        <button onClick={() => handleDelete(cs._id)} className="p-1.5 text-slate-600 hover:text-red-600 rounded">
                                            <Trash2 size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                            <h3 className="text-base font-bold font-heading">{editingItem ? 'Edit Case Study' : 'Create Case Study'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                            <div>
                                <label className="block font-semibold mb-1">Title *</label>
                                <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold mb-1">Client Name</label>
                                    <input type="text" value={form.client} onChange={e => setForm({...form, client: e.target.value})} className="input-field" />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Industry</label>
                                    <input type="text" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} className="input-field" />
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Summary *</label>
                                <textarea rows="2" required value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} className="input-field"></textarea>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Problem Statement *</label>
                                <textarea rows="2" required value={form.problem} onChange={e => setForm({...form, problem: e.target.value})} className="input-field"></textarea>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Solution Provided *</label>
                                <textarea rows="2" required value={form.solution} onChange={e => setForm({...form, solution: e.target.value})} className="input-field"></textarea>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Outcome & Impact *</label>
                                <textarea rows="2" required value={form.outcome} onChange={e => setForm({...form, outcome: e.target.value})} className="input-field"></textarea>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Tech Stack (Comma separated)</label>
                                <input type="text" value={form.techStack} onChange={e => setForm({...form, techStack: e.target.value})} className="input-field" />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Banner Image URL</label>
                                <input type="text" value={form.bannerImage} onChange={e => setForm({...form, bannerImage: e.target.value})} className="input-field" />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary py-2 px-4 text-xs">Cancel</button>
                                <button type="submit" className="btn btn-primary py-2 px-6 text-xs">Save Case Study</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCaseStudies;
