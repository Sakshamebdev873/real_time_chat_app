import React from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the shape of our conversation objects
interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation;
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, selectedConversation, onSelectConversation }) => {
  return (
    <aside className="bg-gray-50 border-r border-gray-200 flex flex-col">
      <header className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
           <h2 className="font-poppins text-2xl font-bold">Chats</h2>
           <button className="text-blue-600 hover:text-blue-700"><PlusCircle size={24}/></button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search..."
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((convo, index) => (
          <motion.div
            key={convo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectConversation(convo)}
            className={`flex items-center p-4 cursor-pointer border-l-4 ${selectedConversation.id === convo.id ? 'bg-white border-blue-600' : 'border-transparent hover:bg-gray-100'}`}
          >
            <img src={convo.avatar} alt={convo.name} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-poppins font-semibold truncate">{convo.name}</p>
                <span className="text-xs text-gray-500">{convo.timestamp}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                 <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
                 {convo.unread > 0 && (
                   <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                     {convo.unread}
                   </span>
                 )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;