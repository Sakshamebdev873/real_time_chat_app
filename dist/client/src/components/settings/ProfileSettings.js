import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// A reusable component for each setting row
const SettingRow = ({ label, description, children }) => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-6 border-b border-gray-200", children: [_jsxs("div", { className: "md:col-span-1", children: [_jsx("h3", { className: "font-semibold text-gray-800", children: label }), _jsx("p", { className: "text-sm text-gray-500", children: description })] }), _jsx("div", { className: "md:col-span-2", children: children })] }));
const ProfileSettings = () => {
    const [profile, setProfile] = useState({
        username: 'Alicia Keys',
        email: 'alicia.keys@example.com',
        bio: 'Grammy-winning artist and producer. Spreading love and light through music.',
    });
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.3 }, children: [_jsx("h2", { className: "text-2xl font-bold font-poppins mb-6", children: "Public Profile" }), _jsx(SettingRow, { label: "Username", description: "This will be displayed on your profile.", children: _jsx("input", { type: "text", name: "username", value: profile.username, onChange: handleChange, className: "w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg" }) }), _jsx(SettingRow, { label: "Bio", description: "A short description about yourself.", children: _jsx("textarea", { name: "bio", rows: 3, value: profile.bio, onChange: handleChange, className: "w-full px-3 py-2 border border-gray-300 rounded-lg" }) }), _jsx(SettingRow, { label: "Profile Photo", description: "This will be your avatar across the app.", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: "https://i.pravatar.cc/150?u=alicia-keys", alt: "Current Avatar", className: "w-16 h-16 rounded-full" }), _jsx("button", { className: "bg-gray-100 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200", children: "Change Photo" })] }) }), _jsx("div", { className: "flex justify-end pt-8", children: _jsx("button", { className: "bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700", children: "Save Changes" }) })] }, "profile"));
};
export default ProfileSettings;
//# sourceMappingURL=ProfileSettings.js.map