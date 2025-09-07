import React from 'react';
import { motion} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Group {
  id: number;
  name: string;
  description: string;
  members: string[];
  memberCount: number;
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
};

const GroupCard: React.FC<{ group: Group }> = ({ group }) => {
  const navigate = useNavigate()
  const handleCardClick = () => {
    // Navigate to the dynamic chat URL for this specific group
    navigate(`/chat/group/${group.id}`);
  };
  return (
    <motion.div 
        variants={cardVariants}
        whileHover={{ y: -8, scale: 1.03, boxShadow: "0px 20px 25px rgba(0, 0, 0, 0.1)" }}
        className="bg-white rounded-2xl p-6 flex flex-col border border-gray-200 cursor-pointer"
        onClick={handleCardClick}
    >
      <h3 className="font-poppins text-xl font-bold mb-2 truncate">{group.name}</h3>
      <p className="text-gray-500 text-sm mb-6 flex-grow">{group.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex -space-x-3">
          {group.members.slice(0, 3).map((avatar, index) => (
            <img key={index} src={avatar} alt="member" className="w-8 h-8 rounded-full border-2 border-white"/>
          ))}
          {group.memberCount > 3 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                +{group.memberCount - 3}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
          <Users size={16}/>
          <span>{group.memberCount} Members</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GroupCard;