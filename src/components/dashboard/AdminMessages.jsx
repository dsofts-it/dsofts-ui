import { useState, useEffect } from 'react';
import { FiTrash2, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import { adminApi } from '../../api/endpoints';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await adminApi.getMessages();
            setMessages(response.data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        try {
            await adminApi.deleteMessage(id);
            setMessages(messages.filter(msg => msg._id !== id));
        } catch (error) {
            console.error('Failed to delete message:', error);
            alert('Failed to delete message');
        }
    };

    if (loading) return <div className="text-center py-10">Loading messages...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Contact Messages ({messages.length})</h2>

            {messages.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">No messages found.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {messages.map((msg) => (
                        <div key={msg._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                            <button
                                onClick={() => handleDelete(msg._id)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete Message"
                            >
                                <FiTrash2 />
                            </button>

                            <div className="flex flex-wrap gap-6 mb-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    {msg.name}
                                </div>
                                <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600">
                                    <FiMail /> {msg.email}
                                </a>
                                <div className="flex items-center gap-2 text-sm text-gray-500 ml-auto">
                                    <FiCalendar /> {new Date(msg.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
                                {msg.message}
                            </div>

                            {(msg.budget || msg.timeline) && (
                                <div className="flex gap-4 mt-4 text-sm text-gray-500">
                                    {msg.budget && <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Budget: {msg.budget}</span>}
                                    {msg.timeline && <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">Timeline: {msg.timeline}</span>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminMessages;
