import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
};
const GroupCard = ({ group }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        // Navigate to the dynamic chat URL for this specific group
        navigate(`/chat/group/${group.id}`);
    };
    return (_jsxs(motion.div, { variants: cardVariants, whileHover: { y: -8, scale: 1.03, boxShadow: "0px 20px 25px rgba(0, 0, 0, 0.1)" }, className: "bg-white rounded-2xl p-6 flex flex-col border border-gray-200 cursor-pointer", onClick: handleCardClick, children: [_jsx("h3", { className: "font-poppins text-xl font-bold mb-2 truncate", children: group.name }), _jsx("p", { className: "text-gray-500 text-sm mb-6 flex-grow", children: group.description }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex -space-x-3", children: [group.members.slice(0, 3).map((avatar, index) => (_jsx("img", { src: avatar, alt: "member", className: "w-8 h-8 rounded-full border-2 border-white" }, index))), group.memberCount > 3 && (_jsxs("div", { className: "w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600", children: ["+", group.memberCount - 3] }))] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600 font-semibold", children: [_jsx(Users, { size: 16 }), _jsxs("span", { children: [group.memberCount, " Members"] })] })] })] }));
};
export default GroupCard;
//# sourceMappingURL=GroupCard.js.map