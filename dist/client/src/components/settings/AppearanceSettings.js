import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react'; // We no longer need useState here
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Check } from 'lucide-react';
// <-- 1. IMPORT THE GLOBAL CONTEXT HOOK
// A reusable, slightly modified SettingRow for this component
const SettingRow = ({ label, description, children }) => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-6 border-b border-gray-200 last:border-b-0", children: [_jsxs("div", { className: "md:col-span-1", children: [_jsx("h3", { className: "font-semibold text-gray-800 dark:text-gray-200", children: label }), " ", _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: description })] }), _jsx("div", { className: "md:col-span-2", children: children })] }));
// Define our color options
const accentColors = [
    { name: 'blue', class: 'bg-blue-600', ring: 'ring-blue-300' },
    { name: 'purple', class: 'bg-purple-600', ring: 'ring-purple-300' },
    { name: 'green', class: 'bg-green-600', ring: 'ring-green-300' },
    { name: 'orange', class: 'bg-orange-500', ring: 'ring-orange-300' },
];
const AppearanceSettings = () => {
    // 2. GET THEME AND SETTERS FROM THE GLOBAL CONTEXT
    // This replaces your local useState hooks.
    return (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.3 }, children: [_jsx("h2", { className: "text-2xl font-bold font-poppins mb-6 dark:text-white", children: "Appearance" }), _jsx(SettingRow, { label: "Theme", description: "Choose a light or dark theme for the entire app.", children: _jsxs("div", { className: "grid grid-cols-2 gap-4 max-w-sm", children: [_jsxs("button", { 
                            // 3. ON CLICK, CALL THE GLOBAL SETTER FUNCTION
                            className: `p-4 border-2 rounded-lg text-left border-primary ring-2 ring-blue-500/50' : 'border-border`, children: [_jsxs("div", { className: "flex items-center gap-2 mb-2 font-semibold dark:text-gray-200", children: [_jsx(Sun, { size: 18 }), " Light"] }), _jsxs("div", { className: "h-20 bg-gray-50 rounded-md p-2 flex gap-1", children: [_jsx("div", { className: "w-1/4 bg-gray-200 rounded-sm" }), _jsx("div", { className: "flex-1 bg-white border border-gray-200 rounded-sm" })] })] }), _jsxs("button", { 
                            // 3. ON CLICK, CALL THE GLOBAL SETTER FUNCTION
                            className: `p-4 border-2 rounded-lg text-left  'border-primary ring-2 ring-blue-500/50' : 'border-border`, children: [_jsxs("div", { className: "flex items-center gap-2 mb-2 font-semibold dark:text-gray-200", children: [_jsx(Moon, { size: 18 }), " Dark"] }), _jsxs("div", { className: "h-20 bg-gray-800 rounded-md p-2 flex gap-1", children: [_jsx("div", { className: "w-1/4 bg-gray-700 rounded-sm" }), _jsx("div", { className: "flex-1 bg-gray-900 border border-gray-700 rounded-sm" })] })] })] }) }), _jsx(SettingRow, { label: "Accent Color", description: "Select your preferred accent color for highlights and buttons.", children: _jsx("div", { className: "flex items-center gap-3", children: accentColors.map(color => (_jsx("button", { 
                        // 3. ON CLICK, CALL THE GLOBAL SETTER FUNCTION
                        className: `w-8 h-8 rounded-full flex items-center justify-center transition-all `, children: _jsx(AnimatePresence, { children: _jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, exit: { scale: 0 }, children: _jsx(Check, { size: 18, className: "text-white" }) }) }) }, color.name))) }) })] }, "appearance"));
};
export default AppearanceSettings;
//# sourceMappingURL=AppearanceSettings.js.map