import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
const testimonials = [
  {
    quote: "ConnectSphere has revolutionized our team's communication. The real-time messaging is flawless, and the interface is incredibly intuitive. A must-have tool for any remote team!",
    author: "Sarah Johnson",
    role: "Project Manager, TechNova",
  },
  {
    quote: "We switched from a competitor, and the difference is night and day. The file sharing is seamless, and the smart notifications help me stay focused. Highly recommended!",
    author: "David Chen",
    role: "Lead Developer, CodeCrafters",
  },
  {
    quote: "The clean UI and user experience are what sets ConnectSphere apart. It's a joy to use every day, and it has genuinely improved our collaborative workflow.",
    author: "Maria Garcia",
    role: "UX Designer, Creative Solutions",
  },
];

const cardVariants :Variants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
          <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by Teams Worldwide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Don't just take our word for it. Here's what some of our amazing users have to say.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2 }}
              variants={cardVariants}
              className="bg-gray-50 p-8 rounded-xl flex flex-col"
            >
              <div className="flex-grow text-gray-700 text-lg mb-6">"{testimonial.quote}"</div>
              <div>
                <div className="font-poppins font-bold">{testimonial.author}</div>
                <div className="text-gray-500">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;