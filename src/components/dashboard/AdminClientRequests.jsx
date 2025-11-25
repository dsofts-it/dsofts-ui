import { useState, useEffect } from 'react';
import { FiExternalLink, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { adminApi } from '../../api/endpoints';

const AdminClientRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        status: '',
        deploymentUrl: '',
        notesFromAdmin: ''
    });

    useEffect(() => {
        fetchRequests();
    }, [filter]);

    const fetchRequests = async () => {
        try {
            const params = filter !== 'all' ? { status: filter } : {};
            const response = await adminApi.getClientProjects(params);
            setRequests(response.data);
        } catch (error) {
            console.error('Failed to fetch requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (req) => {
        setEditingId(req._id);
        setEditForm({
            status: req.status,
            deploymentUrl: req.deploymentUrl || '',
            notesFromAdmin: req.notesFromAdmin || req.adminNotes || ''
        });
    };

    const handleUpdate = async (id) => {
        try {
            const res = await adminApi.updateClientProject(id, editForm);
            setRequests(requests.map(r => r._id === id ? res.data : r));
            setEditingId(null);
        } catch (error) {
            console.error('Failed to update request:', error);
            alert('Failed to update request');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800';
            case 'in_discussion': return 'bg-yellow-100 text-yellow-800';
            case 'in_progress': return 'bg-purple-100 text-purple-800';
            case 'deployed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <div className="text-center py-10">Loading requests...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Client Requests ({requests.length})</h2>
                <select
                    className="input-field w-auto py-2"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="in_discussion">In Discussion</option>
                    <option value="in_progress">In Progress</option>
                    <option value="deployed">Deployed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="grid gap-6">
                {requests.map((req) => (
                    <div key={req._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{req.projectTitle}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <span className="font-medium text-gray-700">Client:</span>
                                    {req.user?.name} ({req.user?.email})
                                </div>
                            </div>
                            {editingId !== req._id && (
                                <button
                                    onClick={() => handleEditClick(req)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(req.status)} hover:opacity-80`}
                                >
                                    {req.status.replace('_', ' ')} (Edit)
                                </button>
                            )}
                        </div>

                        <p className="text-gray-600 mb-4 bg-gray-50 p-4 rounded-lg">{req.projectDescription}</p>

                        {editingId === req._id ? (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
                                <h4 className="font-bold text-gray-900">Update Status</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            className="input-field"
                                            value={editForm.status}
                                            onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                                        >
                                            <option value="new">New</option>
                                            <option value="in_discussion">In Discussion</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="deployed">Deployed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Deployment URL</label>
                                        <input
                                            type="url"
                                            className="input-field"
                                            value={editForm.deploymentUrl}
                                            onChange={e => setEditForm({ ...editForm, deploymentUrl: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes (Visible to Client)</label>
                                        <textarea
                                            className="input-field resize-none"
                                            rows="2"
                                            value={editForm.notesFromAdmin}
                                            onChange={e => setEditForm({ ...editForm, notesFromAdmin: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="btn btn-secondary py-2 px-4 text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleUpdate(req._id)}
                                        className="btn btn-primary py-2 px-4 text-sm"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
                                <div>
                                    <span className="font-medium text-gray-900">Budget:</span> {req.estimatedBudget || 'N/A'}
                                </div>
                                <div>
                                    <span className="font-medium text-gray-900">Created:</span> {new Date(req.createdAt).toLocaleDateString()}
                                </div>
                                {req.deploymentUrl && (
                                    <a
                                        href={req.deploymentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:underline flex items-center gap-1 ml-auto"
                                    >
                                        View Deployment <FiExternalLink />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminClientRequests;
