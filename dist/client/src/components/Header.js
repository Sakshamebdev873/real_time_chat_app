import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
// import { Route } from 'react-router';
const Header = () => {
    return (_jsx("header", { className: "sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50", children: _jsxs("nav", { className: "container mx-auto px-6 py-4 flex justify-between items-center", children: [_jsx("h1", { className: "font-poppins text-2xl font-bold text-blue-600", children: "ConnectSphere" }), _jsxs("div", { className: "hidden md:flex items-center space-x-8", children: [_jsx("a", { href: '/features', className: "text-gray-600 hover:text-blue-600 transition-colors duration-300", children: "Features" }), _jsx("a", { href: '/pricing', className: "text-gray-600 hover:text-blue-600 transition-colors duration-300", children: "Pricing" }), _jsx("a", { href: '/contact', className: "text-gray-600 hover:text-blue-600 transition-colors duration-300", children: "Contact" })] }), _jsx(motion.a, { href: "/auth", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300", children: "Get Started" })] }) }));
};
export default Header;
//# sourceMappingURL=Header.js.map