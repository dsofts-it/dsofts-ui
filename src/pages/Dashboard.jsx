import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <div className="container-custom py-20">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-slate-900">
                    {user.role === 'admin' ? 'Admin Dashboard' : 'Client Dashboard'}
                </h1>
                <div className="bg-primary-50 px-4 py-2 rounded-lg text-primary-700 font-medium">
                    Welcome, {user.name}
                </div>
            </div>

            {user.role === 'admin' ? (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="card p-6">
                        <h3 className="text-xl font-bold mb-2">Manage Projects</h3>
                        <p className="text-slate-600 mb-4">Add, edit, or remove portfolio projects.</p>
                        <button className="btn btn-primary w-full">Go to Projects</button>
                    </div>
                    <div className="card p-6">
                        <h3 className="text-xl font-bold mb-2">Client Requests</h3>
                        <p className="text-slate-600 mb-4">View and manage client project requests.</p>
                        <button className="btn btn-primary w-full">View Requests</button>
                    </div>
                    <div className="card p-6">
                        <h3 className="text-xl font-bold mb-2">Upload Media</h3>
                        <p className="text-slate-600 mb-4">Upload images to Cloudinary.</p>
                        <button className="btn btn-primary w-full">Upload Manager</button>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="card p-6">
                        <h3 className="text-xl font-bold mb-2">My Projects</h3>
                        <p className="text-slate-600 mb-4">Track the status of your ongoing projects.</p>
                        <button className="btn btn-primary w-full">View Projects</button>
                    </div>
                    <div className="card p-6">
                        <h3 className="text-xl font-bold mb-2">New Request</h3>
                        <p className="text-slate-600 mb-4">Start a new project with us.</p>
                        <button className="btn btn-primary w-full">Start Project</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
