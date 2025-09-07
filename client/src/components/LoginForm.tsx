import React, { useState } from 'react';
import { motion} from 'framer-motion';
import type { Variants } from 'framer-motion'
import customFetch from '../libs/customFetch'; // Adjust path if needed
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Corrected import from 'react-router-dom'

// Explicitly type the component's props
interface LoginFormProps {
  onSwitch: () => void;
}

// These variants can be kept the same
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

// Interface for the form state
interface Login {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const [login, setLogin] = useState<Login>({
    email: "",
    password: ""
  });
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This function is perfect, it just needs the 'name' attribute on the inputs
    const { name, value } = e.target;
    setLogin(prevState => ({ ...prevState, [name]: value }));
  };

  // CORRECTED: The function must handle the form event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 1. Prevent the default browser action of reloading the page
    e.preventDefault();

    if (!login.email || !login.password) {
        toast.error("Please enter both email and password.");
        return;
    }

    const toastId = toast.loading("Logging in...");

    try {
      const response = await customFetch.post('/login', login); // Assuming a '/auth/login' endpoint
      
      toast.success("You've logged in successfully!", { id: toastId });
      
      // 2. Navigate ONLY after the login is successful
      setTimeout(() => {
        navigate('/'); 
      }, 1000);

    } catch (error: any) {
      // Show a more specific error message from the backend if available
      const errorMessage = error.response?.data?.msg || "Login failed. Please check your credentials.";
      toast.error(errorMessage, { id: toastId });
      console.error(error);
    }
  };

  return (
    // Pass the correctly defined handleSubmit function
    <form onSubmit={handleSubmit}>
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="hidden" // 3. Added exit prop for smooth transition out
        className="space-y-6"
      >
        <motion.h2 variants={itemVariants} className="font-poppins text-3xl font-bold text-gray-800">Welcome Back</motion.h2>
        
        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input 
            type="email" 
            id="email"
            name="email" // 4. ADDED name attribute
            value={login.email}
            onChange={handleChange}
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
            name="password" // 4. ADDED name attribute
            value={login.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            type='submit'
          >
            Login
          </motion.button>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitch} className="font-semibold text-blue-600 hover:underline focus:outline-none">
            Sign Up
          </button>
        </motion.p>
      </motion.div>
    </form>
  );
};

export default LoginForm;