import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
const steps = [
  {
    icon: '👤',
    title: '1. Create Your Account',
    description: 'Sign up for free in just a few seconds. No credit card required to get started.',
  },
  {
    icon: '🚀',
    title: '2. Create a Channel',
    description: 'Set up channels for your teams, projects, or topics. Organize your conversations effortlessly.',
  },
  {
    icon: '💬',
    title: '3. Start Collaborating',
    description: 'Invite your team members and start communicating with real-time messaging, file sharing, and more.',
  },
];

const cardVariants : Variants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 0.8 },
  },
};

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
            Get Started in Minutes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Connecting your team has never been this simple. Follow three easy steps to transform your communication.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2 }}
              variants={cardVariants}
              className="flex flex-col items-center"
            >
              <div className="bg-blue-100 text-3xl rounded-full w-20 h-20 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="font-poppins font-semibold text-xl mt-6 mb-2">{step.title}</h3>
              <p className="text-gray-600 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
