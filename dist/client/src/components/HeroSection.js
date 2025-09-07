import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import ChatDemo from './chatDemo';
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};
const HeroSection = () => {
    return (_jsxs("section", { className: "container mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between", children: [_jsxs(motion.div, { className: "md:w-1/2 mb-12 md:mb-0", variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsxs(motion.h2, { variants: itemVariants, className: "font-poppins text-4xl md:text-6xl font-bold leading-tight mb-6", children: ["Seamless Conversations,", _jsx("br", {}), _jsx("span", { className: "text-blue-600", children: "Powerful Connections" })] }), _jsx(motion.p, { variants: itemVariants, className: "text-lg text-gray-600 mb-8", children: "ConnectSphere is the modern chat application designed for teams who value clarity, speed, and a little bit of fun." }), _jsx(motion.a, { href: "/auth", variants: itemVariants, whileHover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(74, 144, 226, 0.3)" }, whileTap: { scale: 0.95 }, className: "bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300", children: "Start for Free" })] }), _jsx("div", { className: "md:w-1/2 flex justify-center", children: _jsx(ChatDemo, {}) })] }));
};
export default HeroSection;
//# sourceMappingURL=HeroSection.js.map