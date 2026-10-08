import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import { publicApi } from '../api/endpoints';
import SEO from '../components/common/SEO';

const BlogPostDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await publicApi.getBlogPostBySlug(slug);
                setPost(res.data);
            } catch (err) {
                console.error('Error fetching blog post detail:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen pt-32 pb-20 container-custom text-center">
                <h1 className="text-3xl font-bold mb-4 font-heading">Article Not Found</h1>
                <p className="text-slate-600 mb-8">The requested article could not be loaded.</p>
                <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="py-10 bg-slate-50 min-h-screen">
            <SEO
                title={post.seoTitle || post.title}
                description={post.seoDescription || post.excerpt}
            />

            <article className="container-custom max-w-3xl mx-auto">
                <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary-600 font-medium hover:underline mb-8">
                    <ArrowLeft size={16} />
                    <span>Back to all articles</span>
                </Link>

                <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm mb-8">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-primary-600 uppercase tracking-wider mb-4">
                        <span className="bg-primary-50 px-3 py-1 rounded-md">{post.category}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1 text-slate-500">
                            <Clock size={13} />
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-heading leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-3 pb-6 border-b border-slate-100 text-sm text-slate-600">
                        <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-xs">
                            {post.author?.charAt(0) || 'D'}
                        </div>
                        <div>
                            <div className="font-semibold text-slate-900">{post.author}</div>
                            <div className="text-xs text-slate-500">
                                {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                        </div>
                    </div>

                    {post.featuredImage && (
                        <div className="my-8 rounded-xl overflow-hidden shadow-sm">
                            <img src={post.featuredImage} alt={post.title} className="w-full h-auto max-h-[400px] object-cover" />
                        </div>
                    )}

                    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base space-y-4">
                        {post.content.split('\n\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                            <Tag size={16} className="text-slate-400" />
                            {post.tags.map((t, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                                    #{t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default BlogPostDetail;
