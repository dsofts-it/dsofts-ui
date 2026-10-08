import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, BookOpen, Search } from 'lucide-react';
import { publicApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

const FALLBACK_POSTS = [
    {
        _id: 'b-1',
        title: 'Why React 19 and Vite are the Ideal Stack for Modern Web Development',
        slug: 'react-19-vite-modern-web-development',
        featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
        excerpt: 'Discover how React 19 Actions, Server Components, and Vite speed up build pipelines and transform frontend developer productivity.',
        author: 'DSofts Engineering Team',
        category: 'Web Development',
        tags: ['React', 'Vite', 'Frontend', 'JavaScript'],
        readTime: '4 min read'
    },
    {
        _id: 'b-2',
        title: 'Architecting Scalable Microservices with Node.js and Express',
        slug: 'scalable-microservices-nodejs-express',
        featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        excerpt: 'Best practices for organizing Express servers, database connection pooling, error middleware, and modular API design.',
        author: 'Rohan Dede',
        category: 'Backend & Cloud',
        tags: ['Node.js', 'Express', 'Backend', 'API'],
        readTime: '6 min read'
    },
    {
        _id: 'b-3',
        title: 'Building Modern Healthcare & Telemedicine Apps: Security & Compliance',
        slug: 'building-modern-healthcare-telemedicine-apps',
        featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
        excerpt: 'A comprehensive technical guide to building HIPAA-compliant electronic health records and real-time doctor consultation suites.',
        author: 'DSofts HealthTech Team',
        category: 'Healthcare Tech',
        tags: ['Healthcare', 'Telemedicine', 'React', 'Security'],
        readTime: '5 min read'
    }
];

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await publicApi.getBlogPosts();
                if (res.data && res.data.length > 0) {
                    setPosts(res.data);
                } else {
                    setPosts(FALLBACK_POSTS);
                }
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setPosts(FALLBACK_POSTS);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(
        (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pb-20 bg-slate-50 min-h-screen">
            <SEO
                title="Blog & Articles"
                description="Engineering insights, technology trends, and software architecture articles from DSofts IT Services."
            />

            <section className="py-10">
                <div className="container-custom max-w-6xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <span className="inline-block px-3.5 py-1 rounded-full bg-primary-50 text-primary-700 font-semibold text-xs uppercase tracking-wider mb-3">
                            DSofts Engineering Blog
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-heading mb-4">
                            Insights & Technical Articles
                        </h1>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                            Explore modern web architecture, cloud engineering best practices, mobile development, and product design strategies.
                        </p>
                    </div>
                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-12 relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles by title, tech tag, or topic..."
                            className="input-field pl-12 shadow-sm text-sm"
                        />
                        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-80 bg-white rounded-2xl border border-slate-200 animate-pulse"></div>
                            ))}
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">No Articles Found</h3>
                            <p className="text-slate-600 text-sm">Try broadening your search query or check back later!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, idx) => (
                                <motion.div
                                    key={post._id || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="relative h-48 overflow-hidden bg-slate-900">
                                            <img
                                                src={post.featuredImage || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80'}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
                                                {post.category || 'Tech'}
                                            </span>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-3">
                                                <div className="flex items-center gap-1">
                                                    <User size={13} />
                                                    <span>{post.author}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={13} />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>

                                            <h2 className="text-xl font-bold text-slate-900 mb-3 font-heading group-hover:text-primary-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>

                                            <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-1">
                                            {post.tags?.slice(0, 2).map((t, i) => (
                                                <span key={i} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                                    #{t}
                                                </span>
                                            ))}
                                        </div>

                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700"
                                        >
                                            <span>Read Article</span>
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
