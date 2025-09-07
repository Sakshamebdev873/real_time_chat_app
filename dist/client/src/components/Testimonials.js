import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
const testimonials = [
    {
        quote: "ConnectSphere has revolutionized our team's communication. The real-time messaging is flawless, and the interface is incredibly intuitive. A must-have tool for any remote team!",
        author: "Sarah Johnson",
        role: "Project Manager, TechNova",
    },
    {
        quote: "We switched from a competitor, and the difference is night and day. The file sharing is seamless, and the smart notifications help me stay focused. Highly recommended!",
        author: "David Chen",
        role: "Lead Developer, CodeCrafters",
    },
    {
        quote: "The clean UI and user experience are what sets ConnectSphere apart. It's a joy to use every day, and it has genuinely improved our collaborative workflow.",
        author: "Maria Garcia",
        role: "UX Designer, Creative Solutions",
    },
];
const cardVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};
const Testimonials = () => {
    return (_jsx("section", { className: "bg-white py-24 sm:py-32", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.5 }, transition: { duration: 0.5 }, className: "text-center mb-16", children: [_jsx("h2", { className: "font-poppins text-3xl font-bold tracking-tight sm:text-4xl", children: "Loved by Teams Worldwide" }), _jsx("p", { className: "mt-4 max-w-2xl mx-auto text-lg text-gray-600", children: "Don't just take our word for it. Here's what some of our amazing users have to say." })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: testimonials.map((testimonial, index) => (_jsxs(motion.div, { initial: "offscreen", whileInView: "onscreen", viewport: { once: true, amount: 0.5 }, transition: { delay: index * 0.2 }, variants: cardVariants, className: "bg-gray-50 p-8 rounded-xl flex flex-col", children: [_jsxs("div", { className: "flex-grow text-gray-700 text-lg mb-6", children: ["\"", testimonial.quote, "\""] }), _jsxs("div", { children: [_jsx("div", { className: "font-poppins font-bold", children: testimonial.author }), _jsx("div", { className: "text-gray-500", children: testimonial.role })] })] }, index))) })] }) }));
};
export default Testimonials;
//# sourceMappingURL=Testimonials.js.map