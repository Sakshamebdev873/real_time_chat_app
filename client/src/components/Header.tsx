import React from 'react';
import { motion } from 'framer-motion';
// import { Route } from 'react-router';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-poppins text-2xl font-bold text-blue-600">
          ConnectSphere
        </h1>
        <div className="hidden md:flex items-center space-x-8">
          <a href='/features' className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Features</a>
          <a href='/pricing' className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Pricing</a>
          <a href='/contact' className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</a>
        </div>
        <motion.a
          href="/auth"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Get Started
        </motion.a>
      </nav>
    </header>
  );
};

export default Header;