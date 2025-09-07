import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import customFetch from '../libs/customFetch';
import { Router, useNavigate } from 'react-router';
const formVariants = {
    hidden: {
        opacity: 0,
        transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, staggerDirection: 1 },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
const SignupForm = ({ onSwitch }) => {
    const navigate = useNavigate();
    // Initialize state with an object of empty strings
    const [registration, setRegistration] = useState({
        username: '',
        email: '',
        password: '',
    });
    // A single, flexible handler for all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setRegistration(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        // Simple validation
        if (!registration.username || !registration.email || !registration.password) {
            toast.error('Please fill in all fields.');
            return;
        }
        // Start a loading toast
        const toastId = toast.loading('Creating your account...');
        try {
            const response = await customFetch.post('/register', registration);
            // On success, show a success toast
            toast.success('Account created successfully! Please log in.', { id: toastId });
            setTimeout(() => {
                onSwitch();
            }, 1000);
        }
        catch (error) {
            // On error, show an error toast
            // We check for a specific error message from the backend, otherwise show a generic one
            const errorMessage = error.response?.data?.msg || 'Registration failed. Please try again.';
            toast.error(errorMessage, { id: toastId });
        }
    };
    return (
    // Use the standard lowercase <form> element and type the onSubmit event
    _jsx("form", { onSubmit: handleSubmit, children: _jsxs(motion.div, { variants: formVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "space-y-6", children: [_jsx(motion.h2, { variants: itemVariants, className: "font-poppins text-3xl font-bold text-gray-800", children: "Create an Account" }), _jsxs(motion.div, { variants: itemVariants, children: [_jsx("label", { htmlFor: "fullname", className: "block text-sm font-medium text-gray-600", children: "Full Name" }), _jsx("input", { type: "text", id: "fullname", name: "username" // Add name attribute
                            , value: registration.username, onChange: handleChange, className: "mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all" })] }), _jsxs(motion.div, { variants: itemVariants, children: [_jsx("label", { htmlFor: "email-signup", className: "block text-sm font-medium text-gray-600", children: "Email" }), _jsx("input", { type: "email", id: "email-signup", name: "email" // Add name attribute
                            , value: registration.email, onChange: handleChange, className: "mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all" })] }), _jsxs(motion.div, { variants: itemVariants, children: [_jsx("label", { htmlFor: "password-signup", className: "block text-sm font-medium text-gray-600", children: "Password" }), _jsx("input", { type: "password", id: "password-signup", name: "password" // Add name attribute
                            , value: registration.password, onChange: handleChange, className: "mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all" })] }), _jsx(motion.div, { variants: itemVariants, children: _jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all", type: 'submit', children: "Create Account" }) }), _jsxs(motion.p, { variants: itemVariants, className: "text-center text-sm text-gray-600", children: ["Already have an account?", ' ', _jsx("button", { type: "button", onClick: onSwitch, className: "font-semibold text-blue-600 hover:underline focus:outline-none", children: "Login" })] })] }) }));
};
export default SignupForm;
//# sourceMappingURL=SignUpForm.js.map