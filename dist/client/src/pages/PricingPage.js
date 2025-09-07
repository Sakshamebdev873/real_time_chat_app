import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
const plans = {
    monthly: [
        { name: 'Free', price: '$0', features: ['Up to 5 users', 'Basic features', '1GB storage'], popular: false },
        { name: 'Pro', price: '$12', features: ['Up to 50 users', 'All Pro features', '50GB storage', 'Priority support'], popular: true },
        { name: 'Enterprise', price: 'Contact us', features: ['Unlimited users', 'Advanced security', 'Dedicated support', 'Custom integrations'], popular: false },
    ],
    yearly: [
        { name: 'Free', price: '$0', features: ['Up to 5 users', 'Basic features', '1GB storage'], popular: false },
        { name: 'Pro', price: '$10', features: ['Up to 50 users', 'All Pro features', '50GB storage', 'Priority support'], popular: true },
        { name: 'Enterprise', price: 'Contact us', features: ['Unlimited users', 'Advanced security', 'Dedicated support', 'Custom integrations'], popular: false },
    ]
};
const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
};
const PricingPage = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const handleToggle = () => {
        setBillingCycle(prev => (prev === 'monthly' ? 'yearly' : 'monthly'));
    };
    return (_jsxs(motion.div, { variants: pageVariants, initial: "hidden", animate: "visible", className: "bg-gray-50 font-lato", children: [_jsx(Header, {}), _jsxs("section", { className: "py-24 text-center", children: [_jsx("h1", { className: "font-poppins text-5xl font-bold mb-4", children: "Find the perfect plan" }), _jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto mb-10", children: "Start for free and scale up as you grow. All plans include our core features." }), _jsxs("div", { className: "flex justify-center items-center space-x-4", children: [_jsx("span", { className: `font-semibold ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`, children: "Monthly" }), _jsx("div", { onClick: handleToggle, className: `w-14 h-8 flex items-center bg-gray-200 rounded-full p-1 cursor-pointer transition-colors ${billingCycle === 'yearly' ? 'bg-blue-600' : ''}`, children: _jsx(motion.div, { layout: true, transition: { type: 'spring', stiffness: 700, damping: 30 }, className: "w-6 h-6 bg-white rounded-full shadow-md" }) }), _jsx("span", { className: `font-semibold ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-gray-500'}`, children: "Yearly (Save 20%)" })] })] }), _jsx("section", { className: "pb-24 container mx-auto px-6", children: _jsx("div", { className: "grid lg:grid-cols-3 gap-8", children: _jsx(AnimatePresence, { mode: "wait", children: plans[billingCycle].map((plan, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 50, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1, transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" } }, exit: { opacity: 0, y: -30 }, className: `border rounded-2xl p-8 flex flex-col ${plan.popular ? 'border-blue-500 border-2 relative' : 'border-gray-200 bg-white'}`, children: [plan.popular && _jsx("div", { className: "absolute top-0 -translate-y-1/2 bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full", children: "Most Popular" }), _jsx("h3", { className: "font-poppins text-2xl font-bold", children: plan.name }), _jsxs("div", { className: "flex items-baseline mt-4 mb-6", children: [_jsx("span", { className: "font-poppins text-5xl font-extrabold", children: plan.price }), plan.price !== 'Contact us' && plan.price !== '$0' && (_jsx("span", { className: "text-gray-500 ml-2", children: "/ month" }))] }), _jsx("ul", { className: "space-y-4 text-gray-600 flex-grow", children: plan.features.map(feature => (_jsxs("li", { className: "flex items-center", children: [_jsx(Check, { className: "w-5 h-5 text-blue-500 mr-3" }), feature] }, feature))) }), _jsx("button", { className: `w-full mt-10 py-3 rounded-lg font-semibold transition-transform ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} active:scale-95`, children: plan.price === 'Contact us' ? 'Contact Sales' : 'Get Started' })] }, plan.name))) }) }) }), _jsx(Footer, {})] }));
};
export default PricingPage;
//# sourceMappingURL=PricingPage.js.map