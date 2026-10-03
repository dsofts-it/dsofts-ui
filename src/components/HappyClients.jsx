import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { publicApi } from '../api/endpoints';

const FALLBACK_CLIENTS = [
    {
        _id: 'fallback-1',
        clientName: 'Dr. Meena Dhondge',
        title: 'Dhondge Hospital',
        clientRating: 5,
        shortDescription: 'A clean, responsive hospital website designed to simplify patient access, showcase medical services, and improve digital presence.',
        slug: 'dhondge-hospital'
    },
    {
        _id: 'fallback-2',
        clientName: 'Shubham Bande',
        title: 'Aniket Hospital',
        clientRating: 5,
        shortDescription: 'A modern and user-friendly hospital website designed to streamline patient interactions, appointment booking, and service accessibility.',
        slug: 'aniket-hospital'
    },
    {
        _id: 'fallback-3',
        clientName: 'Soar Company',
        title: 'Soar Task – Finance Dashboard UI',
        clientRating: 4.8,
        shortDescription: 'A modern, responsive finance dashboard UI built to visualize account balances, transactions, and spending insights.',
        slug: 'soar-task-–-finance-dashboard-ui'
    },
    {
        _id: 'fallback-4',
        clientName: 'ABC Corporation',
        title: 'E-commerce Platform',
        clientRating: 4.8,
        shortDescription: 'Modern e-commerce solution with product management, secure payment gateway, and high-performance order tracking.',
        slug: 'ecommerce-platform'
    },
    {
        _id: 'fallback-5',
        clientName: 'Harry',
        title: 'PassMan – Password Manager',
        clientRating: 4.5,
        shortDescription: 'A secure password manager web app built to store, manage, and access credentials easily with advanced local encryption.',
        slug: 'passman'
    }
];

const HappyClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                // Try testimonials API endpoint
                const testimonialsRes = await publicApi.getTestimonials();
                if (testimonialsRes.data && testimonialsRes.data.length > 0) {
                    const formattedTestimonials = testimonialsRes.data.map((t) => ({
                        _id: t._id,
                        clientName: t.clientName,
                        title: t.company ? (t.role ? `${t.company} – ${t.role}` : t.company) : (t.role || 'Valued Client'),
                        clientRating: t.rating || 5,
                        shortDescription: t.content,
                        slug: t._id
                    }));
                    setClients(formattedTestimonials);
                    return;
                }

                // Fallback to projects with client names
                const projectsRes = await publicApi.getProjects();
                const projectsWithClients = (projectsRes.data || []).filter(
                    (project) => project.clientName && project.clientName.trim() !== ''
                );

                if (projectsWithClients.length > 0) {
                    setClients(projectsWithClients);
                } else {
                    setClients(FALLBACK_CLIENTS);
                }
            } catch (error) {
                console.error('Failed to fetch clients from API, using fallback data:', error);
                setClients(FALLBACK_CLIENTS);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const getInitials = (name) => {
        if (!name) return 'C';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    };

    const renderStars = (rating) => {
        const stars = [];
        const roundedRating = Math.round(rating || 5);
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FiStar
                    key={i}
                    className="w-3.5 h-3.5"
                    fill={i <= roundedRating ? "#fbbf24" : "none"}
                    stroke={i <= roundedRating ? "#fbbf24" : "#d1d5db"}
                />
            );
        }
        return stars;
    };

    // Helper to generate repeated list to ensure the marquee is full and loops smoothly
    const getRepeatedList = (list) => {
        if (list.length === 0) return [];
        let repeated = [...list];
        // Ensure we have at least 8 items in the list before duplicating for loop
        while (repeated.length < 8) {
            repeated = [...repeated, ...list];
        }
        return repeated;
    };

    if (loading) {
        return (
            <section className="py-20 bg-gray-50 overflow-hidden">
                <div className="container-custom text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">Happy Clients</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        See how we help businesses transform their digital presence.
                    </p>
                </div>
                <div className="flex gap-6 justify-center animate-pulse">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-white border border-gray-100 flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full bg-gray-100"></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    const baseList = getRepeatedList(clients);
    const marqueeList = [...baseList, ...baseList]; // Duplicate for seamless infinite loop

    // Helper to generate distinct background gradients for initials circle based on client name
    const getGradientClass = (name) => {
        const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const gradients = [
            'from-primary-400 to-secondary-500',
            'from-blue-400 to-indigo-600',
            'from-purple-400 to-pink-500',
            'from-emerald-400 to-teal-600',
            'from-orange-400 to-rose-500',
        ];
        return gradients[charCodeSum % gradients.length];
    };

    return (
        <section className="py-20 bg-gray-50 overflow-hidden relative">
            <div className="container-custom text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">Happy Clients</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Trusted by forward-thinking businesses. Here is what our clients achieved with our premium IT solutions.
                </p>
            </div>

            {/* Marquee Wrapper */}
            <div className="relative w-full overflow-hidden py-4 select-none">
                {/* Left and Right Fades */}
                <div className="absolute top-0 left-0 h-full w-16 md:w-48 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-16 md:w-48 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

                {/* Scrolling Track */}
                <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
                    {marqueeList.map((project, idx) => {
                        const initials = getInitials(project.clientName);
                        const gradient = getGradientClass(project.clientName);
                        
                        return (
                            <Link
                                to={`/portfolio/${project.slug}`}
                                key={`${project._id}-${idx}`}
                                className="group w-64 h-64 md:w-72 md:h-72 rounded-full bg-white border border-gray-100 shadow-md hover:shadow-xl hover:border-primary-300 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center shrink-0 relative overflow-hidden"
                            >
                                {/* Inner Circular Content */}
                                <div className="flex flex-col items-center justify-center h-full w-full">
                                    {/* Initials Avatar */}
                                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr ${gradient} text-white flex items-center justify-center font-bold text-lg md:text-xl shadow-md mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                        {initials}
                                    </div>
                                    
                                    {/* Client Name */}
                                    <h3 className="font-heading font-bold text-gray-900 text-sm md:text-base line-clamp-1 mb-0.5">
                                        {project.clientName}
                                    </h3>
                                    
                                    {/* Project Title */}
                                    <span className="text-xs md:text-sm text-primary-600 font-semibold mb-1 line-clamp-1">
                                        {project.title}
                                    </span>
                                    
                                    {/* Star Rating */}
                                    <div className="flex justify-center text-yellow-400 gap-0.5 mb-2">
                                        {renderStars(project.clientRating)}
                                    </div>
                                    
                                    {/* Testimonial Excerpt */}
                                    <p className="text-[10px] md:text-xs text-gray-500 italic max-w-[170px] md:max-w-[190px] line-clamp-3 leading-relaxed mx-auto">
                                        &ldquo;{project.shortDescription}&rdquo;
                                    </p>
                                </div>
                                
                                {/* Background subtle overlay effect */}
                                <div className="absolute inset-0 bg-primary-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HappyClients;
