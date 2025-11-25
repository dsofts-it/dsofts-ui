import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiCode, FiSmartphone, FiGlobe, FiServer, FiLayout } from 'react-icons/fi';
import { publicApi } from '../api/endpoints';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await publicApi.getServices();
                setServices(response.data);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const getIcon = (title) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('web')) return <FiGlobe />;
        if (lowerTitle.includes('mobile') || lowerTitle.includes('app')) return <FiSmartphone />;
        if (lowerTitle.includes('backend') || lowerTitle.includes('api')) return <FiServer />;
        if (lowerTitle.includes('ui') || lowerTitle.includes('design')) return <FiLayout />;
        return <FiCode />;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gray-900 text-white py-20">
                <div className="container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold font-heading mb-6"
                    >
                        Our Services
                    </motion.h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Comprehensive IT solutions tailored to your business needs. From web development to cloud infrastructure, we've got you covered.
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container-custom py-20">
                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                            >
                                <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                    {getIcon(service.title)}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 mb-6 line-clamp-3">
                                    {service.description}
                                </p>

                                {service.features && service.features.length > 0 && (
                                    <ul className="space-y-3 mb-8">
                                        {service.features.slice(0, 4).map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                                <FiCheck className="mt-0.5 text-green-500 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                                    <span className="text-lg font-bold text-primary-600">
                                        From ${service.startingPrice}
                                    </span>
                                    <button className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">
                                        Learn More →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;
