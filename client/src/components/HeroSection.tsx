import React from 'react';
import { motion} from 'framer-motion';
import type { Variants } from 'framer-motion';
import ChatDemo from './chatDemo';

const containerVariants : Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants:Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const HeroSection: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between">
      <motion.div
        className="md:w-1/2 mb-12 md:mb-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={itemVariants}
          className="font-poppins text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Seamless Conversations,
          <br />
          <span className="text-blue-600">Powerful Connections</span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 mb-8"
        >
          ConnectSphere is the modern chat application designed for teams who
          value clarity, speed, and a little bit of fun.
        </motion.p>
        <motion.a
          href="/auth"
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(74, 144, 226, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          Start for Free
        </motion.a>
      </motion.div>
      <div className="md:w-1/2 flex justify-center">
        <ChatDemo />
      </div>
    </section>
  );
};

export default HeroSection;