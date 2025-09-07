import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};
const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } }
};
const CreateGroupModal = ({ onClose }) => {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ groupName, description }); // Handle creation logic here
        onClose(); // Close modal on submit
    };
    return (_jsx(motion.div, { variants: backdropVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center", onClick: onClose, children: _jsxs(motion.div, { variants: modalVariants, className: "bg-white rounded-2xl w-full max-w-lg p-8 mx-4", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "font-poppins text-2xl font-bold", children: "Create a New Group" }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-800", children: _jsx(X, { size: 24 }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "groupName", className: "block text-sm font-medium text-gray-600 mb-1", children: "Group Name" }), _jsx("input", { type: "text", id: "groupName", value: groupName, onChange: (e) => setGroupName(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-600 mb-1", children: "Description" }), _jsx("textarea", { id: "description", rows: 3, value: description, onChange: (e) => setDescription(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" })] }), _jsxs("div", { className: "flex justify-end gap-4 pt-4", children: [_jsx("button", { type: "button", onClick: onClose, className: "bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200", children: "Cancel" }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700", children: "Create Group" })] })] })] }) }));
};
export default CreateGroupModal;
//# sourceMappingURL=CreateGroupModal.js.map