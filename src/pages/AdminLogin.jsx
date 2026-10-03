import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.message || 'Authentication failed. Please check credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full relative z-10 space-y-6 text-white"
            >
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary-600/20 text-primary-400 border border-primary-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck size={26} />
                    </div>
                    <h1 className="text-2xl font-bold font-heading">DSofts Admin Portal</h1>
                    <p className="text-xs text-slate-400">Authorized Personnel Management Console</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl flex items-center gap-2.5 text-xs">
                        <AlertCircle size={16} className="flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@dsofts.in"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white focus:border-primary-500 focus:outline-none transition-colors"
                            />
                            <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-10 pr-12 text-sm text-white focus:border-primary-500 focus:outline-none transition-colors"
                            />
                            <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-3 text-slate-400 hover:text-white p-1 focus:outline-none transition-colors"
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn btn-primary py-3 text-sm font-semibold shadow-lg shadow-primary-600/20 disabled:opacity-50 mt-2"
                    >
                        {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
