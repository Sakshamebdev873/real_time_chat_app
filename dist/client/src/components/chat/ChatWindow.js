import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Phone, Search, MoreVertical, Send, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import Message from './Message'; // We'll create this next
// Mock data for messages for a single conversation
const mockMessages = [
    { id: 1, sender: 'other', text: 'Hey, did you see the new designs?', timestamp: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Just saw them! They look incredible. ✨ Great job.', timestamp: '10:31 AM' },
    { id: 3, sender: 'other', text: 'Awesome! Let\'s get the team\'s feedback today.', timestamp: '10:32 AM' },
    { id: 4, sender: 'me', text: 'Sounds like a plan. I\'ll set up a channel for it.', timestamp: '10:33 AM' },
];
const ChatWindow = ({ conversation }) => {
    const [newMessage, setNewMessage] = useState('');
    const handleSend = () => {
        if (newMessage.trim() === '')
            return;
        console.log('Sending:', newMessage); // In a real app, this would send the message
        setNewMessage('');
    };
    return (_jsxs("main", { className: "bg-white flex flex-col h-screen", children: [_jsxs("header", { className: "flex items-center p-4 border-b border-gray-200", children: [_jsx("img", { src: conversation.avatar, alt: conversation.name, className: "w-12 h-12 rounded-full mr-4" }), _jsx("h2", { className: "font-poppins text-xl font-bold flex-1", children: conversation.name }), _jsxs("div", { className: "flex items-center gap-4 text-gray-500", children: [_jsx("button", { className: "hover:text-blue-600", children: _jsx(Phone, {}) }), _jsx("button", { className: "hover:text-blue-600", children: _jsx(Search, {}) }), _jsx("button", { className: "hover:text-blue-600", children: _jsx(MoreVertical, {}) })] })] }), _jsx("div", { className: "flex-1 p-6 overflow-y-auto", children: mockMessages.map((msg, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Message, { sender: msg.sender, text: msg.text, timestamp: msg.timestamp }) }, msg.id))) }), _jsx("footer", { className: "p-4 border-t border-gray-200", children: _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: "Type a message...", value: newMessage, onChange: (e) => setNewMessage(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSend(), className: "w-full bg-gray-100 border border-transparent rounded-lg pl-12 pr-28 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("button", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600", children: _jsx(Paperclip, {}) }), _jsxs("button", { onClick: handleSend, className: "absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 font-semibold hover:bg-blue-700 transition-colors", children: ["Send ", _jsx(Send, { size: 18 })] })] }) })] }));
};
export default ChatWindow;
//# sourceMappingURL=ChatWindow.js.map