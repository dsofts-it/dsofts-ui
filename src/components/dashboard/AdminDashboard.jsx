import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminProjects from './AdminProjects';
import AdminClientRequests from './AdminClientRequests';
import AdminServices from './AdminServices';
import AdminMessages from './AdminMessages';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');

    const tabs = [
        { id: 'projects', label: 'Portfolio' },
        { id: 'requests', label: 'Client Requests' },
        { id: 'services', label: 'Services' },
        { id: 'messages', label: 'Messages' },
    ];

    return (
        <div className="space-y-8">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-white text-primary-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="min-h-[500px]">
                {activeTab === 'projects' && <AdminProjects />}
                {activeTab === 'requests' && <AdminClientRequests />}
                {activeTab === 'services' && <AdminServices />}
                {activeTab === 'messages' && <AdminMessages />}
            </div>
        </div>
    );
};

export default AdminDashboard;
