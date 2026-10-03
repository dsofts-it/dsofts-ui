import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import DSoftsLogo from '../components/common/DSoftsLogo';

const Admin = () => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

    return (
        <div className="container-custom py-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <DSoftsLogo className="h-12 md:h-14 w-auto" isDarkBg={false} />
                    <span className="text-xl font-bold text-slate-800 font-heading border-l border-slate-200 pl-4">
                        Admin Business Console
                    </span>
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
