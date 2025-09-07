
import React, { useState } from 'react';
import { motion} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { X } from 'lucide-react';

const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants: Variants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } }
};

const CreateGroupModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ groupName, description }); // Handle creation logic here
        onClose(); // Close modal on submit
    }

    return (
        <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <motion.div
                variants={modalVariants}
                className="bg-white rounded-2xl w-full max-w-lg p-8 mx-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-poppins text-2xl font-bold">Create a New Group</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24}/></button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="groupName" className="block text-sm font-medium text-gray-600 mb-1">Group Name</label>
                        <input 
                            type="text" 
                            id="groupName"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                        <textarea 
                            id="description" 
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
                            Create Group
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default CreateGroupModal;