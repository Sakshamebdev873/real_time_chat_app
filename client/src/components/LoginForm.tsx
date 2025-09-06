import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
// Explicitly type the component's props
interface LoginFormProps {
  onSwitch: () => void;
}

const formVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, staggerDirection: 1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="space-y-6"
    >
      <motion.h2 variants={itemVariants} className="font-poppins text-3xl font-bold text-gray-800">Welcome Back</motion.h2>
      
      <motion.div variants={itemVariants}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
        <input 
          type="email" 
          id="email"
          className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
        </div>
        <input 
          type="password" 
          id="password"
          className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          Login
        </motion.button>
      </motion.div>
      
      <motion.p variants={itemVariants} className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button onClick={onSwitch} className="font-semibold text-blue-600 hover:underline focus:outline-none">
          Sign Up
        </button>
      </motion.p>
    </motion.div>
  );
};

export default LoginForm;