import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { adminApi } from '../../api/endpoints';

const AdminBlog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: 'DSofts Engineering Team',
        category: 'Technology',
        tags: '',
        status: 'Published',
        featuredImage: ''
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await adminApi.getAllBlogPosts();
            setPosts(res.data || []);
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
                excerpt: item.excerpt || '',
                content: item.content || '',
                author: item.author || 'DSofts Engineering Team',
                category: item.category || 'Technology',
                tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
                status: item.status || 'Published',
                featuredImage: item.featuredImage || ''
            });
        } else {
            setEditingItem(null);
            setForm({
                title: '',
                excerpt: '',
                content: '',
                author: 'DSofts Engineering Team',
                category: 'Technology',
                tags: '',
                status: 'Published',
                featuredImage: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await adminApi.updateBlogPost(editingItem._id, form);
            } else {
                await adminApi.createBlogPost(form);
            }
            setIsModalOpen(false);
            fetchPosts();
        } catch (err) {
            alert('Failed to save article.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete article?')) return;
        try {
            await adminApi.deleteBlogPost(id);
            fetchPosts();
        } catch (err) {
            alert('Failed to delete article.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading">Blog & Articles CMS</h2>
                    <p className="text-xs text-slate-500">Publish engineering articles and company updates.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="btn btn-primary py-2 px-4 text-xs flex items-center gap-2">
                    <Plus size={16} />
                    <span>Write Article</span>
                </button>
            </div>

            {loading ? (
                <div className="p-8 text-center text-slate-400">Loading articles...</div>
            ) : posts.length === 0 ? (
                <div className="bg-white p-8 text-center rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-600">No blog posts published yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                            <tr>
                                <th className="p-4">Title</th>
                                <th className="p-4">Author</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {posts.map((p) => (
                                <tr key={p._id} className="hover:bg-slate-50/50">
                                    <td className="p-4 font-bold text-slate-900">{p.title}</td>
                                    <td className="p-4 text-slate-600">{p.author}</td>
                                    <td className="p-4 text-slate-600">{p.category}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                            p.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => handleOpenModal(p)} className="p-1.5 text-slate-600 hover:text-primary-600 rounded">
                                            <Edit2 size={15} />
                                        </button>
                                        <button onClick={() => handleDelete(p._id)} className="p-1.5 text-slate-600 hover:text-red-600 rounded">
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
                            <h3 className="text-base font-bold font-heading">{editingItem ? 'Edit Article' : 'Write Article'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                            <div>
                                <label className="block font-semibold mb-1">Article Title *</label>
                                <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold mb-1">Author</label>
                                    <input type="text" value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="input-field" />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Category</label>
                                    <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field" />
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Excerpt *</label>
                                <textarea rows="2" required value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="input-field"></textarea>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Content (Markdown / Text) *</label>
                                <textarea rows="6" required value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="input-field"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold mb-1">Tags (Comma separated)</label>
                                    <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="input-field" />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Featured Image URL</label>
                                    <input type="text" value={form.featuredImage} onChange={e => setForm({...form, featuredImage: e.target.value})} className="input-field" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary py-2 px-4 text-xs">Cancel</button>
                                <button type="submit" className="btn btn-primary py-2 px-6 text-xs">Save Article</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlog;
