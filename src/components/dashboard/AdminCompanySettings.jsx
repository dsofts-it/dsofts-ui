import { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { adminApi, publicApi } from '../../api/endpoints';

const AdminCompanySettings = () => {
    const [settings, setSettings] = useState({
        companyName: 'DSofts IT Services',
        tagline: 'Building Digital Products That Move Businesses Forward.',
        heroDescription: 'Web applications, mobile apps, custom software and digital solutions built for growing businesses.',
        primaryEmail: 'rohan@dsofts.in',
        careersEmail: 'careers@dsofts.in',
        phone: '+91 8446031622',
        address: 'Pune, Maharashtra, India',
        mission: 'To empower ambitious businesses with scalable, secure, and intuitive digital solutions.',
        vision: 'To become a trusted global product development partner known for technical excellence.'
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await publicApi.getCompanySettings();
            if (res.data) setSettings(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSavedSuccess(false);

        try {
            await adminApi.updateCompanySettings(settings);
            setSavedSuccess(true);
            setTimeout(() => setSavedSuccess(false), 4000);
        } catch (err) {
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-400">Loading settings...</div>;

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-xl font-bold text-slate-900 font-heading">Company & Website Settings</h2>
                <p className="text-xs text-slate-500">Edit core company content displayed across the public platform.</p>
            </div>

            {savedSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2 text-xs font-semibold">
                    <CheckCircle size={18} className="text-emerald-600" />
                    <span>Company settings updated successfully!</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Company Name</label>
                        <input
                            type="text"
                            value={settings.companyName || ''}
                            onChange={e => setSettings({ ...settings, companyName: e.target.value })}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Primary Email</label>
                        <input
                            type="email"
                            value={settings.primaryEmail || ''}
                            onChange={e => setSettings({ ...settings, primaryEmail: e.target.value })}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Contact Phone</label>
                        <input
                            type="text"
                            value={settings.phone || ''}
                            onChange={e => setSettings({ ...settings, phone: e.target.value })}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Office Address</label>
                        <input
                            type="text"
                            value={settings.address || ''}
                            onChange={e => setSettings({ ...settings, address: e.target.value })}
                            className="input-field"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-semibold mb-1">Hero Tagline</label>
                    <input
                        type="text"
                        value={settings.tagline || ''}
                        onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                        className="input-field"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Hero Description</label>
                    <textarea
                        rows="3"
                        value={settings.heroDescription || ''}
                        onChange={e => setSettings({ ...settings, heroDescription: e.target.value })}
                        className="input-field"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Mission Statement</label>
                        <textarea
                            rows="3"
                            value={settings.mission || ''}
                            onChange={e => setSettings({ ...settings, mission: e.target.value })}
                            className="input-field"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Vision Statement</label>
                        <textarea
                            rows="3"
                            value={settings.vision || ''}
                            onChange={e => setSettings({ ...settings, vision: e.target.value })}
                            className="input-field"
                        ></textarea>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button type="submit" disabled={saving} className="btn btn-primary py-2.5 px-6 text-xs gap-2">
                        <Save size={16} />
                        <span>{saving ? 'Saving...' : 'Save Settings'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminCompanySettings;
