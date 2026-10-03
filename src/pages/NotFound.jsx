import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { ArrowLeft, Compass } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen pt-28 pb-20 bg-slate-900 text-white flex items-center justify-center">
            <SEO title="404 Page Not Found" />
            <div className="container-custom max-w-lg text-center space-y-6">
                <div className="w-20 h-20 bg-primary-500/10 text-primary-400 border border-primary-500/20 rounded-3xl flex items-center justify-center mx-auto">
                    <Compass size={40} className="animate-spin-slow" />
                </div>
                <h1 className="text-6xl md:text-8xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
                    404
                </h1>
                <h2 className="text-2xl font-bold font-heading text-slate-100">Page Not Found</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                    The page you are looking for might have been moved, renamed, or does not exist on the DSofts platform.
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link to="/" className="btn btn-primary text-sm gap-2">
                        <ArrowLeft size={16} />
                        <span>Return to Home</span>
                    </Link>
                    <Link to="/services" className="btn btn-outline text-sm">
                        Explore Services
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
