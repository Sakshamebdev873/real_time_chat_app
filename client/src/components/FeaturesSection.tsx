import React from 'react';
import { motion} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MessageSquare, FolderUp, BellRing, Lock } from 'lucide-react';

const features = [
  {
    // 2. Use the component reference directly
    icon: MessageSquare,
    title: 'Real-time Messaging',
    description: 'Engage in instant, real-time conversations with your team members. No delays, no waiting.',
  },
  {
    icon: FolderUp,
    title: 'Seamless File Sharing',
    description: 'Drag and drop files, documents, and images directly into your conversations. Sharing has never been easier.',
  },
  {
    icon: BellRing,
    title: 'Smart Notifications',
    description: 'Customize your notifications to stay focused on what matters most. Mute channels or get notified only when mentioned.',
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'Your conversations are private and secure with our state-of-the-art end-to-end encryption.',
  },
];

// Added the Variants type to prevent TypeScript errors
const cardVariants: Variants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need to Connect</h2>
            <p className="mt-4 text-lg text-gray-600">
                Discover a better way to communicate and collaborate with a suite of powerful, intuitive features.
            </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
                 <motion.div
                    key={index}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants}
                 >
                    <motion.div
                        whileHover={{ y: -10, boxShadow: "0px 20px 25px rgba(0, 0, 0, 0.1)"}}
                        className="bg-gray-50 p-8 rounded-2xl h-full flex flex-col items-start" // Align content to the start
                    >
                        {/* 3. Render the icon as a component */}
                        <div className="bg-blue-100 p-3 rounded-xl mb-6">
                           <feature.icon className="w-8 h-8 text-blue-600" strokeWidth={2.5} />
                        </div>
                        
                        <h3 className="font-poppins font-semibold text-xl mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;