import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/signUpForm';
// Component to render the animated background gradient
const AnimatedGradient = () => (_jsx(motion.div, { className: "absolute inset-0 z-0", animate: {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    }, transition: {
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
    }, style: {
        background: 'linear-gradient(-45deg, #4A90E2, #50E3C2, #357ABD, #8360C3)',
        backgroundSize: '400% 400%',
    } }));
const AuthPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center font-lato", children: _jsxs("div", { className: "relative w-full max-w-5xl h-[600px] flex shadow-2xl rounded-3xl overflow-hidden", children: [_jsxs("div", { className: "relative hidden lg:flex w-1/2 items-center justify-center p-12 text-white", children: [_jsx(AnimatedGradient, {}), _jsxs("div", { className: "relative z-10 text-center", children: [_jsx(motion.h1, { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6, delay: 0.2 }, className: "font-poppins text-4xl font-bold mb-4", children: "ConnectSphere" }), _jsx(motion.p, { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6, delay: 0.4 }, className: "text-lg opacity-90", children: "Seamless Conversations, Powerful Connections." })] })] }), _jsx("div", { className: "w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center", children: _jsx(AnimatePresence, { mode: "wait", children: isLoginView ? (_jsx(LoginForm, { onSwitch: () => setIsLoginView(false) }, "login")) : (_jsx(SignupForm, { onSwitch: () => setIsLoginView(true) }, "signup")) }) })] }) }));
};
export default AuthPage;
//# sourceMappingURL=AuthPage.js.map