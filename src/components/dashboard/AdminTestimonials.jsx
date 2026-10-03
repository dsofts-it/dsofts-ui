import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { adminApi, publicApi } from '../../api/endpoints';

const AdminTestimonials = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [form, setForm] = useState({
        clientName: '',
        role: '',
        company: '',
        content: '',
        rating: 5,
        isFeatured: true,
        avatarUrl: ''
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await adminApi.getAllTestimonials();
            setItems(res.data || []);
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
                clientName: item.clientName || '',
                role: item.role || '',
                company: item.company || '',
                content: item.content || '',
                rating: item.rating || 5,
                isFeatured: item.isFeatured !== undefined ? item.isFeatured : true,
                avatarUrl: item.avatarUrl || ''
            });
        } else {
            setEditingItem(null);
            setForm({
                clientName: '',
                role: '',
                company: '',
                content: '',
                rating: 5,
                isFeatured: true,
                avatarUrl: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await adminApi.updateTestimonial(editingItem._id, form);
            } else {
                await adminApi.createTestimonial(form);
            }
            setIsModalOpen(false);
            fetchItems();
        } catch (err) {
            alert('Failed to save testimonial.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete testimonial?')) return;
        try {
            await adminApi.deleteTestimonial(id);
            fetchItems();
        } catch (err) {
            alert('Failed to delete testimonial.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading">Testimonials CMS</h2>
                    <p className="text-xs text-slate-500">Manage real client testimonials displayed on the site.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="btn btn-primary py-2 px-4 text-xs flex items-center gap-2">
                    <Plus size={16} />
                    <span>Add Testimonial</span>
                </button>
            </div>

            {loading ? (
                <div className="p-8 text-center text-slate-400">Loading testimonials...</div>
            ) : items.length === 0 ? (
                <div className="bg-white p-8 text-center rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-600">No testimonials saved yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                            <tr>
                                <th className="p-4">Client Name</th>
                                <th className="p-4">Role & Company</th>
                                <th className="p-4">Rating</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.map((t) => (
                                <tr key={t._id} className="hover:bg-slate-50/50">
                                    <td className="p-4 font-bold text-slate-900">{t.clientName}</td>
                                    <td className="p-4 text-slate-600">{t.role} {t.company && `at ${t.company}`}</td>
                                    <td className="p-4 text-amber-500 font-bold">{t.rating} / 5</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => handleOpenModal(t)} className="p-1.5 text-slate-600 hover:text-primary-600 rounded">
                                            <Edit2 size={15} />
                                        </button>
                                        <button onClick={() => handleDelete(t._id)} className="p-1.5 text-slate-600 hover:text-red-600 rounded">
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
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                            <h3 className="text-base font-bold font-heading">{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                            <div>
                                <label className="block font-semibold mb-1">Client Name *</label>
                                <input type="text" required value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})} className="input-field" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold mb-1">Role / Designation</label>
                                    <input type="text" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="input-field" />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Company</label>
                                    <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="input-field" />
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Testimonial Content *</label>
                                <textarea rows="3" required value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="input-field"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold mb-1">Rating (1 to 5)</label>
                                    <input type="number" min="1" max="5" value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})} className="input-field" />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Avatar Image URL</label>
                                    <input type="text" value={form.avatarUrl} onChange={e => setForm({...form, avatarUrl: e.target.value})} className="input-field" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary py-2 px-4 text-xs">Cancel</button>
                                <button type="submit" className="btn btn-primary py-2 px-6 text-xs">Save Testimonial</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTestimonials;
