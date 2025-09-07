import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return _jsx(ProfileSettings, {});
            case 'notifications':
                return _jsx(NotificationsSettings, {});
            case 'appearance': // <-- Add this case
                return _jsx(AppearanceSettings, {});
            default:
                return _jsx(ProfileSettings, {});
        }
    };
    return (_jsxs("div", { className: "flex h-screen bg-background text-foreground bg-gray-100 font-lato", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsx("header", { className: "bg-white border-b border-gray-200 p-6", children: _jsx("h1", { className: "font-poppins text-3xl font-bold", children: "Settings" }) }), _jsxs("div", { className: "flex-1 grid grid-cols-1 md:grid-cols-[280px_1fr] overflow-hidden", children: [_jsx("aside", { className: "bg-white border-r border-gray-200 p-6 overflow-y-auto", children: _jsx("nav", { className: "flex flex-col gap-2", children: TABS.map(tab => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center gap-3 px-4 py-3 rounded-lg text-left font-semibold transition-colors ${activeTab === tab.id
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-100'}`, children: [_jsx(tab.icon, { size: 20 }), _jsx("span", { children: tab.label })] }, tab.id))) }) }), _jsx("div", { className: "flex-1 overflow-y-auto p-8", children: _jsx(AnimatePresence, { mode: "wait", children: renderContent() }) })] })] })] }));
};
export default SettingsPage;
//# sourceMappingURL=SettingsPage.js.map