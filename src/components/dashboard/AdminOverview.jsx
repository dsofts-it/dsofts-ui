import { useState, useEffect } from 'react';
import { Briefcase, Users, FolderCheck, Mail, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import { adminApi } from '../../api/endpoints';

const AdminOverview = () => {
    const [stats, setStats] = useState({
        totalJobs: 0,
        totalApplications: 0,
        totalProjects: 0,
        totalMessages: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const [jobsRes, appsRes, projectsRes, messagesRes] = await Promise.allSettled([
                    adminApi.getAllJobs(),
                    adminApi.getApplications(),
                    adminApi.getProjects(),
                    adminApi.getMessages()
                ]);

                setStats({
                    totalJobs: jobsRes.status === 'fulfilled' ? (jobsRes.value.data || []).length : 0,
                    totalApplications: appsRes.status === 'fulfilled' ? (appsRes.value.data || []).length : 0,
                    totalProjects: projectsRes.status === 'fulfilled' ? (projectsRes.value.data || []).length : 0,
                    totalMessages: messagesRes.status === 'fulfilled' ? (messagesRes.value.data || []).length : 0,
                });
            } catch (err) {
                console.error('Error fetching admin overview:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOverviewData();
    }, []);

    const statCards = [
        { label: 'Active Jobs', value: stats.totalJobs, icon: Briefcase, color: 'bg-blue-50 text-blue-600 border-blue-100' },
        { label: 'Candidate Applications', value: stats.totalApplications, icon: Users, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { label: 'Portfolio Projects', value: stats.totalProjects, icon: FolderCheck, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
        { label: 'Contact Enquiries', value: stats.totalMessages, icon: Mail, color: 'bg-amber-50 text-amber-600 border-amber-100' }
    ];

    if (loading) {
        return <div className="p-8 text-center text-slate-500 font-medium">Loading platform metrics...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className={`bg-white p-6 rounded-2xl border ${card.color.split(' ')[2]} shadow-sm space-y-4`}>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.label}</span>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color.split(' ')[0]} ${card.color.split(' ')[1]}`}>
                                    <Icon size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-extrabold text-slate-900 font-heading">{card.value}</div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                    <TrendingUp className="text-primary-600" size={20} />
                    <span>DSofts Business Control System</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Use the sidebar navigation tabs to publish job openings, review candidate resumes, edit portfolio case studies, manage contact leads, update blog articles, and customize company settings.
                </p>
            </div>
        </div>
    );
};

export default AdminOverview;
