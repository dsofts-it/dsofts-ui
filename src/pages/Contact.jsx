import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { publicApi } from '../api/endpoints';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        budget: '',
        timeline: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await publicApi.sendContactMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '', budget: '', timeline: '' });
        } catch (error) {
            console.error('Failed to send message:', error);
            setStatus('error');
            setErrorMessage('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gray-900 text-white py-20">
                <div className="container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold font-heading mb-6"
                    >
                        Get in Touch
                    </motion.h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you shortly.
                    </p>
                </div>
            </div>

            <div className="container-custom -mt-12 pb-16">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                            <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Contact Details</h3>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary-50 text-primary-600 rounded-full">
                                        <FiPhone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Call us</p>
                                        <p className="font-semibold text-gray-900">+91 8446031622</p>
                                        <p className="font-semibold text-gray-900">+91 9226805459</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary-50 text-primary-600 rounded-full">
                                        <FiMail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-semibold text-gray-900">rohan@dsofts.in</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary-50 text-primary-600 rounded-full">
                                        <FiMapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Office</p>
                                        <p className="font-semibold text-gray-900">Pune, Maharashtra</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-green-50 text-green-700 p-6 rounded-xl flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <FiCheckCircle size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                                    <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 btn btn-primary"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {status === 'error' && (
                                        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3">
                                            <FiAlertCircle />
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className="input-field"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="input-field"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                                                Estimated Budget (Optional)
                                            </label>
                                            <select
                                                id="budget"
                                                name="budget"
                                                className="input-field"
                                                value={formData.budget}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select a range</option>
                                                <option value="< $5k">Less than $5,000</option>
                                                <option value="$5k - $10k">$5,000 - $10,000</option>
                                                <option value="$10k - $25k">$10,000 - $25,000</option>
                                                <option value="$25k+">$25,000+</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                                                Timeline (Optional)
                                            </label>
                                            <select
                                                id="timeline"
                                                name="timeline"
                                                className="input-field"
                                                value={formData.timeline}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select a timeline</option>
                                                <option value="< 1 month">Less than 1 month</option>
                                                <option value="1-3 months">1-3 months</option>
                                                <option value="3-6 months">3-6 months</option>
                                                <option value="6 months+">6 months+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows="4"
                                            className="input-field resize-none"
                                            placeholder="Tell us about your project..."
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="btn btn-primary w-full flex items-center justify-center gap-2"
                                    >
                                        {status === 'loading' ? (
                                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Send Message
                                                <FiSend />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
