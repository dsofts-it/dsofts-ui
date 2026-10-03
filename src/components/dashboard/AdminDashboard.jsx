import { useState } from 'react';
import {
    LayoutDashboard, Briefcase, Users, FolderCheck, BookOpen, Layers,
    MessageSquare, Mail, Settings, Star, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminOverview from './AdminOverview';
import AdminJobs from './AdminJobs';
import AdminApplications from './AdminApplications';
import AdminProjects from './AdminProjects';
import AdminCaseStudies from './AdminCaseStudies';
import AdminServices from './AdminServices';
import AdminBlog from './AdminBlog';
import AdminTestimonials from './AdminTestimonials';
import AdminMessages from './AdminMessages';
import AdminCompanySettings from './AdminCompanySettings';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { logout } = useAuth();

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'jobs', label: 'Careers & Jobs', icon: Briefcase },
        { id: 'applications', label: 'Applications', icon: Users },
        { id: 'portfolio', label: 'Portfolio & Projects', icon: FolderCheck },
        { id: 'casestudies', label: 'Case Studies', icon: BookOpen },
        { id: 'services', label: 'Services CMS', icon: Layers },
        { id: 'testimonials', label: 'Testimonials', icon: Star },
        { id: 'blog', label: 'Blog & Articles', icon: MessageSquare },
        { id: 'messages', label: 'Lead Enquiries', icon: Mail },
        { id: 'settings', label: 'Company Settings', icon: Settings },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-1 sticky top-24">
                <div className="p-3 border-b border-slate-100 mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">CMS Management</span>
                    <span className="text-xs font-bold text-slate-900 font-heading">DSofts Business Control</span>
                </div>

                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                                isActive
                                    ? 'bg-primary-600 text-white shadow-sm shadow-primary-600/20'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <Icon size={16} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}

                <hr className="my-2 border-slate-100" />

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </div>

            {/* Tab Workspace Panel */}
            <div className="lg:col-span-9 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 min-h-[600px]">
                {activeTab === 'overview' && <AdminOverview />}
                {activeTab === 'jobs' && <AdminJobs />}
                {activeTab === 'applications' && <AdminApplications />}
                {activeTab === 'portfolio' && <AdminProjects />}
                {activeTab === 'casestudies' && <AdminCaseStudies />}
                {activeTab === 'services' && <AdminServices />}
                {activeTab === 'testimonials' && <AdminTestimonials />}
                {activeTab === 'blog' && <AdminBlog />}
                {activeTab === 'messages' && <AdminMessages />}
                {activeTab === 'settings' && <AdminCompanySettings />}
            </div>
        </div>
    );
};

export default AdminDashboard;
