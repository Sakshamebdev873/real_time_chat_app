import React, { useState } from 'react';
import { motion} from 'framer-motion';
import type { Variants } from 'framer-motion';
import toast from 'react-hot-toast';
import customFetch from '../libs/customFetch';
import { Router, useNavigate } from 'react-router';
// Explicitly type the component's props
interface SignupFormProps {
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
interface Register {
  username : string,
  password : string,
  email : string,
}
const SignupForm: React.FC<SignupFormProps> = ({ onSwitch }) => {
  const navigate = useNavigate()
  // Initialize state with an object of empty strings
  const [registration, setRegistration] = useState<Register>({
    username: '',
    email: '',
    password: '',
  });
  
  // A single, flexible handler for all input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name,value);
    setRegistration(prevState => ({
      ...prevState,
      [name]: value,
    }));
    
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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


    } catch (error: any) {
      // On error, show an error toast
      // We check for a specific error message from the backend, otherwise show a generic one
      const errorMessage = error.response?.data?.msg || 'Registration failed. Please try again.';
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    // Use the standard lowercase <form> element and type the onSubmit event
    <form onSubmit={handleSubmit}>
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="space-y-6"
      >
        <motion.h2 variants={itemVariants} className="font-poppins text-3xl font-bold text-gray-800">Create an Account</motion.h2>
        
        <motion.div variants={itemVariants}>
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-600">Full Name</label>
          <input 
            type="text" 
            id="fullname"
            name="username" // Add name attribute
            value={registration.username} // Bind value to state
            onChange={handleChange} // Handle changes
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <label htmlFor="email-signup" className="block text-sm font-medium text-gray-600">Email</label>
          <input 
            type="email" 
            id="email-signup"
            name="email" // Add name attribute
            value={registration.email} // Bind value to state
            onChange={handleChange} // Handle changes
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="password-signup" className="block text-sm font-medium text-gray-600">Password</label>
          <input 
            type="password" 
            id="password-signup"
            name="password" // Add name attribute
            value={registration.password} // Bind value to state
            onChange={handleChange} // Handle changes
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            type='submit'
          >
            Create Account
          </motion.button>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button type="button" onClick={onSwitch} className="font-semibold text-blue-600 hover:underline focus:outline-none">
            Login
          </button>
        </motion.p>
      </motion.div>
    </form>
  );
};

export default SignupForm;