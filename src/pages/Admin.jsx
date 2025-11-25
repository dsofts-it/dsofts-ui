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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Admin Panel</h1>
                <span className="bg-primary-50 px-4 py-2 rounded-lg text-primary-700 font-medium">
                    Welcome, {user.name}
                </span>
            </div>
            <AdminDashboard />
        </div>
    );
};

export default Admin;
