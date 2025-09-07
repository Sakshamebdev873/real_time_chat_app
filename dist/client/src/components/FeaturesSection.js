import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FolderUp, BellRing, Lock } from 'lucide-react';
const features = [
    {
        // 2. Use the component reference directly
        icon: MessageSquare,
        title: 'Real-time Messaging',
        description: 'Engage in instant, real-time conversations with your team members. No delays, no waiting.',
    },
    {
        icon: FolderUp,
        title: 'Seamless File Sharing',
        description: 'Drag and drop files, documents, and images directly into your conversations. Sharing has never been easier.',
    },
    {
        icon: BellRing,
        title: 'Smart Notifications',
        description: 'Customize your notifications to stay focused on what matters most. Mute channels or get notified only when mentioned.',
    },
    {
        icon: Lock,
        title: 'End-to-End Encryption',
        description: 'Your conversations are private and secure with our state-of-the-art end-to-end encryption.',
    },
];
// Added the Variants type to prevent TypeScript errors
const cardVariants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};
const FeaturesSection = () => {
    return (_jsx("section", { id: "features", className: "bg-white py-24 sm:py-32", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [_jsx("h2", { className: "font-poppins text-3xl font-bold tracking-tight sm:text-4xl", children: "Everything You Need to Connect" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Discover a better way to communicate and collaborate with a suite of powerful, intuitive features." })] }), _jsx("div", { className: "mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: features.map((feature, index) => (_jsx(motion.div, { initial: "offscreen", whileInView: "onscreen", viewport: { once: true, amount: 0.5 }, variants: cardVariants, children: _jsxs(motion.div, { whileHover: { y: -10, boxShadow: "0px 20px 25px rgba(0, 0, 0, 0.1)" }, className: "bg-gray-50 p-8 rounded-2xl h-full flex flex-col items-start" // Align content to the start
                            , children: [_jsx("div", { className: "bg-blue-100 p-3 rounded-xl mb-6", children: _jsx(feature.icon, { className: "w-8 h-8 text-blue-600", strokeWidth: 2.5 }) }), _jsx("h3", { className: "font-poppins font-semibold text-xl mb-2", children: feature.title }), _jsx("p", { className: "text-gray-600", children: feature.description })] }) }, index))) })] }) }));
};
export default FeaturesSection;
//# sourceMappingURL=FeaturesSection.js.map