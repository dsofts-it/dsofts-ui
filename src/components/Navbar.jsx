import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DSoftsLogo from './common/DSoftsLogo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Solutions', path: '/solutions' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-1'
                    : 'bg-white backdrop-blur-sm border-b border-slate-100/80 py-1.5 md:py-2'
            }`}
        >
            <div className="container-custom flex justify-between items-center min-h-[64px]">
                {/* DSofts Logo - Sleek & Compact Proportions */}
                <Link to="/" className="flex items-center group focus:outline-none">
                    <DSoftsLogo className="h-9 sm:h-10 md:h-12 lg:h-14 w-auto object-contain" isDarkBg={false} />
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-xs md:text-sm font-semibold transition-all duration-200 relative py-1 ${
                                    isActive
                                        ? 'text-primary-600 font-bold'
                                        : 'text-slate-700 hover:text-primary-600'
                                }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavIndicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA & User Controls */}
                <div className="hidden lg:flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-700 hover:text-primary-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-50">
                                <div className="w-7 h-7 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-xs border border-primary-200">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span>{user?.name?.split(' ')[0]}</span>
                            </button>

                            <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 w-52">
                                    {user?.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors mb-1"
                                        >
                                            <LayoutDashboard size={15} />
                                            Admin Business Panel
                                        </Link>
                                    )}
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors mb-1"
                                    >
                                        <User size={15} />
                                        My Account
                                    </Link>
                                    <hr className="my-1 border-gray-100" />
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                                    >
                                        <LogOut size={15} />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <Link
                        to="/contact"
                        className="btn btn-primary py-2.5 px-5 text-xs md:text-sm font-bold shadow-sm hover:shadow-md gap-2 rounded-full"
                    >
                        <span>Start a Project</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-slate-700 hover:text-primary-600 focus:outline-none rounded-lg hover:bg-slate-100 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Navigation Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden bg-white border-b border-gray-200 shadow-xl overflow-hidden"
                    >
                        <div className="container-custom py-6 flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                                        location.pathname === link.path
                                            ? 'bg-primary-50 text-primary-600 font-bold'
                                            : 'text-slate-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <hr className="border-gray-100 my-2" />

                            {isAuthenticated ? (
                                <div className="flex flex-col gap-2">
                                    {user?.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            className="flex items-center gap-2 py-2.5 px-3 text-sm font-semibold text-primary-700 bg-primary-50 rounded-lg"
                                        >
                                            <LayoutDashboard size={18} />
                                            Admin Business Panel
                                        </Link>
                                    )}
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-2 py-2.5 px-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg text-left"
                                    >
                                        <LogOut size={18} />
                                        Logout ({user?.name})
                                    </button>
                                </div>
                            ) : null}

                            <Link
                                to="/contact"
                                className="btn btn-primary w-full py-3 mt-2 text-center justify-center gap-2 font-bold rounded-full"
                            >
                                <span>Start a Project</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
