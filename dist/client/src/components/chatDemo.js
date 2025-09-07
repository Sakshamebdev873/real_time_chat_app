import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const messages = [
    { text: "Hey! Did you see the new designs?", isUser: false },
    { text: "Just saw them, they look amazing! ✨", isUser: true },
    { text: "Great! Let's sync up later today to discuss.", isUser: false },
    { text: "Sounds good! 👍", isUser: true },
];
const ChatDemo = () => {
    const [currentMessages, setCurrentMessages] = useState([]);
    useEffect(() => {
        let index = 0;
        const addMessage = () => {
            if (index < messages.length) {
                setCurrentMessages(prev => [...prev, messages[index]]);
                index++;
            }
            else {
                // Reset and loop the animation
                setTimeout(() => {
                    setCurrentMessages([]);
                    index = 0;
                    addMessage();
                }, 3000);
                return; // Stop the interval
            }
            setTimeout(addMessage, 1500);
        };
        addMessage();
    }, []);
    return (_jsxs("div", { className: "w-full max-w-sm h-[450px] bg-white rounded-2xl shadow-2xl p-4 flex flex-col space-y-3", children: [_jsx("div", { className: "flex-grow flex flex-col justify-end space-y-3", children: _jsx(AnimatePresence, { children: currentMessages.map((msg, index) => (_jsx(motion.div, { layout: true, initial: { opacity: 0, y: 20, scale: 0.8 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, scale: 0.5 }, transition: { duration: 0.4, ease: 'easeOut' }, className: `max-w-xs p-3 rounded-2xl ${msg?.isUser
                            ? 'bg-blue-600 text-white self-end rounded-br-lg'
                            : 'bg-gray-200 text-gray-800 self-start rounded-bl-lg'}`, children: msg?.text }, index))) }) }), _jsx("div", { className: "h-12 bg-gray-100 rounded-lg mt-4" })] }));
};
export default ChatDemo;
//# sourceMappingURL=chatDemo.js.map