import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Header from '../components/Header'; // Assuming you have a reusable Header for logged-in state
import Sidebar from '../components/chat/Sidebar'; // Using the chat sidebar for consistency
import GroupCard from '../components/groups/GroupCard';
import CreateGroupModal from '../components/groups/CreateGroupModal';

// Mock data
const mockGroups = [
  { id: 1, name: 'Project Phoenix', description: 'Cross-functional team for the new web app.', members: [/* avatar URLs */ 'https://i.pravatar.cc/150?u=a1', 'https://i.pravatar.cc/150?u=a2', 'https://i.pravatar.cc/150?u=a3'], memberCount: 12 },
  { id: 2, name: 'Marketing Team', description: 'All things related to marketing and outreach.', members: ['https://i.pravatar.cc/150?u=b1', 'https://i.pravatar.cc/150?u=b2', 'https://i.pravatar.cc/150?u=b3'], memberCount: 8 },
  { id: 3, name: 'Frontend Developers', description: 'Discussion and code reviews for the frontend team.', members: ['https://i.pravatar.cc/150?u=c1', 'https://i.pravatar.cc/150?u=c2'], memberCount: 6 },
  { id: 4, name: 'Book Club', description: 'Casual discussion about our monthly reads.', members: ['https://i.pravatar.cc/150?u=d1', 'https://i.pravatar.cc/150?u=d2', 'https://i.pravatar.cc/150?u=d3'], memberCount: 25 },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const GroupsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-lato">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
            {/* Page Header */}
            <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h1 className="font-poppins text-3xl font-bold">Groups</h1>
                <motion.button 
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Create Group
                </motion.button>
            </header>

            {/* Groups Grid */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                {mockGroups.map(group => (
                    <GroupCard key={group.id} group={group} />
                ))}
            </motion.div>
        </main>

        <AnimatePresence>
            {isModalOpen && <CreateGroupModal onClose={() => setIsModalOpen(false)} />}
        </AnimatePresence>
    </div>
  );
};

export default GroupsPage;