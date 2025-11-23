import { motion } from 'framer-motion';
import { Code, Smartphone, Layout, Database, Cloud, Shield } from 'lucide-react';

const services = [
    {
        icon: <Code size={32} />,
        title: 'Web Development',
        description: 'Custom web applications built with modern technologies like React, Node.js, and Next.js.',
        color: 'bg-blue-500'
    },
    {
        icon: <Smartphone size={32} />,
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications for iOS and Android devices.',
        color: 'bg-purple-500'
    },
    {
        icon: <Layout size={32} />,
        title: 'UI/UX Design',
        description: 'User-centered design that creates intuitive and engaging digital experiences.',
        color: 'bg-pink-500'
    },
    {
        icon: <Database size={32} />,
        title: 'Backend Systems',
        description: 'Robust and scalable server-side solutions to power your applications.',
        color: 'bg-green-500'
    },
    {
        icon: <Cloud size={32} />,
        title: 'Cloud Solutions',
        description: 'Secure cloud infrastructure setup and management on AWS, Azure, or Google Cloud.',
        color: 'bg-cyan-500'
    },
    {
        icon: <Shield size={32} />,
        title: 'Cyber Security',
        description: 'Protecting your digital assets with advanced security measures and audits.',
        color: 'bg-red-500'
    }
];

const ServicesSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Our Expertise
                    </h2>
                    <p className="text-lg text-slate-600">
                        We offer a comprehensive range of IT services to help your business grow and succeed in the digital age.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card p-8 group hover:border-primary-100"
                        >
                            <div className={`w-14 h-14 rounded-xl ${service.color} bg-opacity-10 flex items-center justify-center text-${service.color.replace('bg-', '')} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <div className={`text-${service.color.replace('bg-', '')}-600`}>
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
