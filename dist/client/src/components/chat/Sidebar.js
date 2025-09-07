import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { MessageSquare, Users, Settings, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import customFetch from '../../libs/customFetch';
import toast from 'react-hot-toast';
const Sidebar = () => {
    const linkClasses = "p-3 text-gray-500 hover:bg-gray-100 rounded-xl";
    const activeLinkClasses = "p-3 bg-blue-100 text-blue-600 rounded-xl";
    const navigate = useNavigate();
    const handleClick = async () => {
        try {
            const response = await customFetch.get('/logout');
            if (response) {
                toast.success("Succesfully Logged Out.....");
            }
            navigate('/');
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to Logged out. Try again later....");
        }
    };
    return (_jsxs("div", { className: "bg-white border-r border-gray-200 flex flex-col justify-between items-center py-6", children: [_jsx("div", { className: "text-blue-600", children: _jsx(MessageSquare, { size: 32 }) }), _jsxs("nav", { className: "flex flex-col items-center gap-6", children: [_jsx(NavLink, { to: "/chat", className: ({ isActive }) => isActive ? activeLinkClasses : linkClasses, children: _jsx(MessageSquare, { size: 24 }) }), _jsxs(NavLink, { to: "/groups", className: ({ isActive }) => isActive ? activeLinkClasses : linkClasses, children: [" ", _jsx(Users, { size: 24 })] }), _jsx(NavLink, { to: "/settings", className: ({ isActive }) => isActive ? activeLinkClasses : linkClasses, children: _jsx(Settings, { size: 24 }) })] }), _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("button", { onClick: handleClick, className: "text-gray-500 hover:text-red-500", children: _jsx(LogOut, { size: 24 }) }), _jsx("img", { src: "https://i.pravatar.cc/150?u=a042581f4e29026704c", alt: "User Avatar", className: "w-12 h-12 rounded-full" })] })] }));
};
export default Sidebar;
//# sourceMappingURL=Sidebar.js.map