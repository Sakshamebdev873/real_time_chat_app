import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/signUpForm';

// Component to render the animated background gradient
const AnimatedGradient = () => (
  <motion.div
    className="absolute inset-0 z-0"
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    }}
    transition={{
      duration: 20,
      ease: 'linear',
      repeat: Infinity,
    }}
    style={{
      background: 'linear-gradient(-45deg, #4A90E2, #50E3C2, #357ABD, #8360C3)',
      backgroundSize: '400% 400%',
    }}
  />
);

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-lato">
      <div className="relative w-full max-w-5xl h-[600px] flex shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Left Branding Panel */}
        <div className="relative hidden lg:flex w-1/2 items-center justify-center p-12 text-white">
          <AnimatedGradient />
          <div className="relative z-10 text-center">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-poppins text-4xl font-bold mb-4"
            >
              ConnectSphere
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg opacity-90"
            >
              Seamless Conversations, Powerful Connections.
            </motion.p>
          </div>
        </div>
        
        {/* Right Form Panel */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isLoginView ? (
              <LoginForm key="login" onSwitch={() => setIsLoginView(false)} />
            ) : (
              <SignupForm key="signup" onSwitch={() => setIsLoginView(true)} />
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
};

export default AuthPage;