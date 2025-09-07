import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Palette } from 'lucide-react';

import Sidebar from '../components/chat/Sidebar';
import ProfileSettings from '../components/settings/ProfileSettings';
import NotificationsSettings from '../components/settings/NotificationSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';

// Define our tabs
const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

   const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationsSettings />;
      case 'appearance': // <-- Add this case
        return <AppearanceSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground bg-gray-100 font-lato">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-6">
          <h1 className="font-poppins text-3xl font-bold">Settings</h1>
        </header>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-[280px_1fr] overflow-hidden">
          {/* Settings Navigation */}
          <aside className="bg-white border-r border-gray-200 p-6 overflow-y-auto">
            <nav className="flex flex-col gap-2">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Settings Content Panel */}
          <div className="flex-1 overflow-y-auto p-8">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;