import React from 'react';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-2xl shadow-xl p-12"
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Team's Communication?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of productive teams who are building stronger connections with ConnectSphere. Get started for free today!
          </p>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white text-blue-600 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 inline-block"
          >
            Start Your Free Trial
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;