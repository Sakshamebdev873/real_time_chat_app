import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import ToggleSwitch from './ToggleSwitch'; // Our new toggle switch
const SettingRow = ({ label, description, children }) => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-6 border-b border-gray-200", children: [_jsxs("div", { className: "md:col-span-1", children: [_jsx("h3", { className: "font-semibold text-gray-800", children: label }), _jsx("p", { className: "text-sm text-gray-500", children: description })] }), _jsx("div", { className: "md:col-span-2 flex justify-start", children: children })] }));
const NotificationsSettings = () => {
    return (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.3 }, children: [_jsx("h2", { className: "text-2xl font-bold font-poppins mb-6", children: "Notifications" }), _jsx(SettingRow, { label: "Email Notifications", description: "Receive emails about mentions and new messages.", children: _jsx(ToggleSwitch, { initialValue: true }) }), _jsx(SettingRow, { label: "Push Notifications", description: "Get notified on your desktop or mobile device.", children: _jsx(ToggleSwitch, { initialValue: true }) }), _jsx(SettingRow, { label: "Message Preview", description: "Show a preview of the message in the notification.", children: _jsx(ToggleSwitch, {}) }), _jsx(SettingRow, { label: "Notification Sounds", description: "Play a sound when a new notification arrives.", children: _jsx(ToggleSwitch, { initialValue: true }) })] }, "notifications"));
};
export default NotificationsSettings;
//# sourceMappingURL=NotificationSettings.js.map