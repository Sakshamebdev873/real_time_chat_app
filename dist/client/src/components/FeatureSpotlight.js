import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
const textVariants = {
    offscreen: { opacity: 0, y: 20 },
    onscreen: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.5 } }
};
const itemVariants = {
    offscreen: { opacity: 0, y: 10 },
    onscreen: { opacity: 1, y: 0 }
};
const FeatureSpotlight = ({ icon: Icon, title, description, image }) => {
    const ref = useRef(null);
    // Create the scroll-triggered animations for the image
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'] // Animate as it passes through the viewport
    });
    const scale = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1]);
    const rotateX = useTransform(scrollYProgress, [0.2, 0.6], ['15deg', '0deg']);
    return (_jsx("section", { ref: ref, className: "py-12 sm:py-24 overflow-hidden", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.div, { initial: "offscreen", whileInView: "onscreen", viewport: { once: true, amount: 0.4 }, variants: textVariants, className: "mx-auto max-w-2xl text-center mb-12", children: [_jsx(motion.div, { variants: itemVariants, className: "flex justify-center mb-6", children: _jsx("div", { className: "bg-blue-100 p-4 rounded-2xl", children: _jsx(Icon, { className: "w-10 h-10 text-blue-600" }) }) }), _jsx(motion.h2, { variants: itemVariants, className: "font-poppins text-4xl font-bold mb-4", children: title }), _jsx(motion.p, { variants: itemVariants, className: "text-gray-600 text-lg leading-relaxed", children: description })] }), _jsx(motion.div, { style: {
                        scale,
                        rotateX,
                        perspective: '1000px'
                    }, className: "mx-auto", children: _jsx("img", { src: image, alt: title, className: "rounded-2xl shadow-2xl ring-2 ring-gray-900/10 w-full max-w-6xl mx-auto" }) })] }) }));
};
export default FeatureSpotlight;
//# sourceMappingURL=FeatureSpotlight.js.map