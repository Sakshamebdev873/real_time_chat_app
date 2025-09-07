import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FolderUp, BellRing, Users, Code, Activity, Zap, Search, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
// We combine all features into one comprehensive list for the grid
const allFeatures = [
    {
        icon: Zap,
        title: "Real-time Engine",
        description: "Our infrastructure ensures messages are delivered instantly for a seamless conversation flow."
    },
    {
        icon: Search,
        title: "Advanced Search",
        description: "Instantly find messages, files, and conversations by user, date, or keyword."
    },
    {
        icon: ShieldCheck,
        title: "Enterprise Security",
        description: "Protect your data with end-to-end encryption, access controls, and audit logs."
    },
    {
        icon: MessageSquare,
        title: "Threaded Conversations",
        description: "Keep discussions organized, focused, and incredibly easy to follow within any channel."
    },
    {
        icon: FolderUp,
        title: "Seamless File Sharing",
        description: "Drag, drop, preview, and share any file type with your team without leaving the app."
    },
    {
        icon: BellRing,
        title: "Smart Notifications",
        description: "Customize your alerts to stay in the loop on what matters most without the noise."
    },
    {
        icon: Users,
        title: "Team Management",
        description: "Efficiently organize your workspace with user roles, groups, and permissions."
    },
    {
        icon: Code,
        title: "Developer APIs",
        description: "Build custom integrations and extend ConnectSphere’s functionality to fit your workflow."
    },
    {
        icon: Activity,
        title: "Activity & Presence",
        description: "See who's online, available, or actively typing to improve communication timing."
    }
];
const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
};
const cardVariants = {
    offscreen: { opacity: 0, y: 30 },
    onscreen: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring', bounce: 0.3 } }
};
const FeaturesPage = () => {
    return (_jsxs(motion.div, { variants: pageVariants, initial: "hidden", animate: "visible", className: "bg-gray-50 font-lato text-gray-800", children: [_jsx(Header, {}), _jsx("header", { className: "bg-gradient-to-br from-blue-600 via-cyan-400 to-purple-500 py-24 sm:py-32 text-center", children: _jsxs(motion.div, { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8, ease: 'easeOut' }, className: "container mx-auto px-6", children: [_jsxs("h1", { className: "font-poppins text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white", children: [" ", "Powerful by Design"] }), _jsxs("p", { className: "text-lg text-blue-100 max-w-3xl mx-auto", children: [" ", "Explore the comprehensive suite of features that make ConnectSphere the most intuitive and robust communication platform for modern teams."] })] }) }), _jsx("main", { className: "container mx-auto px-6 py-24", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: allFeatures.map((feature, index) => (_jsxs(motion.div, { initial: "offscreen", whileInView: "onscreen", viewport: { once: true, amount: 0.5 }, transition: { delay: index * 0.05 }, variants: cardVariants, whileHover: {
                            y: -10,
                            scale: 1.03,
                            boxShadow: "0px 20px 30px rgba(74, 144, 226, 0.2)" // A magnificent colored shadow
                        }, className: "bg-white p-8 rounded-2xl border border-gray-100 h-full flex flex-col cursor-pointer", children: [_jsx("div", { className: "bg-blue-100 p-3 rounded-xl inline-block mb-5", children: _jsx(feature.icon, { className: "w-7 h-7 text-blue-600" }) }), _jsx("h3", { className: "font-poppins font-semibold text-xl mb-3", children: feature.title }), _jsx("p", { className: "text-gray-600 flex-grow", children: feature.description })] }, feature.title))) }) }), _jsx(CTASection, {}), _jsx(Footer, {})] }));
};
export default FeaturesPage;
//# sourceMappingURL=FeaturePage.js.map