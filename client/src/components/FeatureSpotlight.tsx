import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { LucideProps } from 'lucide-react';

interface FeatureSpotlightProps {
  icon: React.FC<LucideProps>;
  title: string;
  description: string;
  image: string;
}

const textVariants: Variants = {
    offscreen: { opacity: 0, y: 20 },
    onscreen: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.5 } }
};

const itemVariants: Variants = {
    offscreen: { opacity: 0, y: 10 },
    onscreen: { opacity: 1, y: 0 }
};

const FeatureSpotlight: React.FC<FeatureSpotlightProps> = ({ icon: Icon, title, description, image }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create the scroll-triggered animations for the image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'] // Animate as it passes through the viewport
  });

  const scale = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0.2, 0.6], ['15deg', '0deg']);

  return (
    <section ref={ref} className="py-12 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Centered Text Content */}
        <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.4 }}
            variants={textVariants}
            className="mx-auto max-w-2xl text-center mb-12"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-2xl">
              <Icon className="w-10 h-10 text-blue-600" />
            </div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="font-poppins text-4xl font-bold mb-4">{title}</motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 text-lg leading-relaxed">{description}</motion.p>
        </motion.div>

        {/* Expansive Image with 3D Effect */}
        <motion.div
          style={{ 
            scale, 
            rotateX,
            perspective: '1000px'
          }}
          className="mx-auto"
        >
          <img
            src={image}
            alt={title}
            className="rounded-2xl shadow-2xl ring-2 ring-gray-900/10 w-full max-w-6xl mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSpotlight;