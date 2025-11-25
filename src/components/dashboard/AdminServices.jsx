import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi';
import { adminApi } from '../../api/endpoints';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    const initialFormState = {
        title: '',
        description: '',
        startingPrice: '',
        features: '', // comma separated string for input
        isPopular: false
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await adminApi.getServices(); // Assuming public endpoint works for listing
            setServices(response.data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        setIsEditing(true);
        setCurrentService(service);
        setFormData({
            title: service.title,
            description: service.description,
            startingPrice: service.startingPrice,
            features: service.features.join(', '),
            isPopular: service.isPopular || false
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            await adminApi.deleteService(id);
            setServices(services.filter(s => s._id !== id));
        } catch (error) {
            console.error('Failed to delete service:', error);
            alert('Failed to delete service');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            features: formData.features.split(',').map(f => f.trim()).filter(f => f)
        };

        try {
            if (currentService) {
                const res = await adminApi.updateService(currentService._id, data);
                setServices(services.map(s => s._id === currentService._id ? res.data : s));
            } else {
                const res = await adminApi.createService(data);
                setServices([...services, res.data]);
            }
            resetForm();
        } catch (error) {
            console.error('Failed to save service:', error);
            alert('Failed to save service');
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentService(null);
        setFormData(initialFormState);
    };

    if (loading) return <div className="text-center py-10">Loading services...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Services ({services.length})</h2>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-primary text-sm py-2 px-4 flex items-center gap-2"
                        >
                            <FiPlus /> Add Service
                        </button>
                    )}
                </div>

                <div className="grid gap-4">
                    {services.map((service) => (
                        <div key={service._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start group">
                            <div>
                                <h3 className="font-bold text-gray-900">{service.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                                <p className="text-sm font-medium text-primary-600">From ${service.startingPrice}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form */}
            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-24">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">
                            {currentService ? 'Edit Service' : 'New Service'}
                        </h3>
                        <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                            <FiX />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                required
                                className="input-field"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                rows="3"
                                className="input-field resize-none"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price ($)</label>
                            <input
                                type="number"
                                required
                                className="input-field"
                                value={formData.startingPrice}
                                onChange={e => setFormData({ ...formData, startingPrice: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                            <textarea
                                rows="3"
                                className="input-field resize-none"
                                placeholder="Feature 1, Feature 2, Feature 3"
                                value={formData.features}
                                onChange={e => setFormData({ ...formData, features: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isPopular"
                                className="rounded text-primary-600 focus:ring-primary-500"
                                checked={formData.isPopular}
                                onChange={e => setFormData({ ...formData, isPopular: e.target.checked })}
                            />
                            <label htmlFor="isPopular" className="text-sm text-gray-700">Mark as Popular</label>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button type="submit" className="btn btn-primary flex-1">
                                {currentService ? 'Update Service' : 'Create Service'}
                            </button>
                            <button type="button" onClick={resetForm} className="btn btn-secondary flex-1">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminServices;
