import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook, Instagram, Mail, MapPin } from 'lucide-react';
import DSoftsLogo from './common/DSoftsLogo';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/" className="inline-block py-1">
                            <DSoftsLogo className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto max-h-32 scale-110 origin-left object-contain" isDarkBg={true} />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            DSofts IT Services is a modern software engineering and technology consulting company. Building high-performance web platforms, cross-platform mobile applications, and enterprise custom software.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Instagram, href: 'https://instagram.com/dsofts.in', label: 'Instagram' },
                                { icon: Linkedin, href: 'https://www.linkedin.com/company/dsofts-it-services', label: 'LinkedIn' },
                                { icon: Facebook, href: 'https://facebook.com/dsoftsitservices', label: 'Facebook' },
                                { icon: Twitter, href: 'https://x.com/dsoftsOfficial', label: 'X (Twitter)' },
                            ].map(({ icon: Icon, href, label }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 hover:border-primary-500 transition-all duration-200"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-5">Company</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { label: 'Home', path: '/' },
                                { label: 'About Us', path: '/about' },
                                { label: 'Services', path: '/services' },
                                { label: 'Solutions', path: '/solutions' },
                                { label: 'Portfolio', path: '/portfolio' },
                                { label: 'Case Studies', path: '/case-studies' },
                                { label: 'Careers Portal', path: '/careers' },
                                { label: 'Blog & Insights', path: '/blog' },
                                { label: 'Contact Us', path: '/contact' },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link to={item.path} className="text-slate-400 hover:text-primary-400 transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-5">Services</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                'Web Development',
                                'Mobile App Development',
                                'Full Stack Software',
                                'Custom CRM & SaaS',
                                'AI Solutions',
                                'Cloud & Deployment',
                            ].map((item) => (
                                <li key={item}>
                                    <Link to="/services" className="text-slate-400 hover:text-primary-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-5">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-primary-500 mt-1 shrink-0" size={16} />
                                <span>Pune, Maharashtra, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-primary-500 shrink-0" size={16} />
                                <a href="mailto:dsofts.itservices@gmail.com" className="hover:text-white transition-colors">dsofts.itservices@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; {currentYear} DSofts IT Services. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
