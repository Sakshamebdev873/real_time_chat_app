import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const Message = ({ sender, text, timestamp }) => {
    const isMe = sender === 'me';
    return (_jsx("div", { className: `flex mb-4 ${isMe ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `max-w-md p-4 rounded-2xl ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`, children: [_jsx("p", { children: text }), _jsx("span", { className: `text-xs mt-2 block text-right ${isMe ? 'text-blue-100' : 'text-gray-500'}`, children: timestamp })] }) }));
};
export default Message;
//# sourceMappingURL=Message.js.map