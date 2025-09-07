import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom'; // <-- Import hooks
// Import the components
import Sidebar from '../components/chat/Sidebar';
import ConversationList from '../components/chat/ConversationList';
import ChatWindow from '../components/chat/ChatWindow';
// --- NEW UNIFIED MOCK DATA ---
// Create a single source of truth for all "chats", including type and id.
const allChats = [
    // Direct Messages
    { id: 1, type: 'dm', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', lastMessage: 'See you tomorrow!', timestamp: '10:42 AM', unread: 2 },
    { id: 3, type: 'dm', name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', lastMessage: 'Sounds good!', timestamp: 'Yesterday', unread: 0 },
    // Groups
    { id: 2, type: 'group', name: 'Project Phoenix', avatar: 'https://tinyurl.com/5n88b9ua', lastMessage: 'Let\'s review the new designs.', timestamp: '9:30 AM', unread: 0 },
    { id: 4, type: 'group', name: 'Marketing Team', avatar: 'https://tinyurl.com/5n88b9ua', lastMessage: 'Don\'t forget the team meeting at 2 PM.', timestamp: 'Yesterday', unread: 5 },
];
const ChatPage = () => {
    // 1. Get dynamic parameters from the URL
    const { type, id } = useParams();
    const navigate = useNavigate();
    // 2. The main state for the currently displayed conversation
    const [selectedConversation, setSelectedConversation] = useState(null);
    // 3. This effect runs whenever the URL changes (e.g., you click a new group)
    useEffect(() => {
        // Find the chat data that matches the URL parameters
        const currentChat = allChats.find(chat => chat.type === type && chat.id === Number(id));
        if (currentChat) {
            setSelectedConversation(currentChat);
        }
        else {
            // Handle cases where the chat ID is invalid, e.g., redirect
            navigate('/chat/group/2'); // Redirect to a default chat
        }
    }, [type, id, navigate]); // The effect depends on the URL params
    // 4. New handler for when a user clicks a conversation in the list
    const handleSelectConversation = (conversation) => {
        navigate(`/chat/${conversation.type}/${conversation.id}`);
    };
    // Display a loading state until the conversation is found and set
    if (!selectedConversation) {
        return (_jsx("div", { className: "h-screen w-full flex items-center justify-center", children: _jsx("p", { children: "Loading Chat..." }) }));
    }
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: "flex h-screen bg-background text-foreground font-lato", children: _jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "grid grid-cols-[80px_320px_1fr] h-screen", children: [_jsx(Sidebar, {}), _jsx(ConversationList, { conversations: allChats, selectedConversation: selectedConversation, onSelectConversation: handleSelectConversation }), _jsx(ChatWindow, { conversation: selectedConversation })] }) }) }));
};
export default ChatPage;
//# sourceMappingURL=ChatPage.js.map