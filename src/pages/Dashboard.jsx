import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ClientDashboard from '../components/dashboard/ClientDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const Dashboard = () => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <div className="container-custom py-20">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    {user.role === 'admin' ? 'Admin Dashboard' : 'Client Dashboard'}
                </h1>
                <div className="bg-primary-50 px-4 py-2 rounded-lg text-primary-700 font-medium">
                    Welcome, {user.name}
                </div>
            </div>

            {user.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />}
        </div>
    );
};

export default Dashboard;
