import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const Admin = () => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

    return (
        <div className="container-custom py-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 font-heading tracking-tight">
                        Admin Business Console
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">Manage portfolio projects, career openings, applications, services & inquiries</p>
                </div>
                <span className="bg-primary-50 border border-primary-200 px-4 py-2 rounded-xl text-primary-700 text-xs font-bold">
                    Logged in as: {user.name} ({user.email})
                </span>
            </div>
            <AdminDashboard />
        </div>
    );
};

export default Admin;
