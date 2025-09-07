import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch: React.FC<{ initialValue?: boolean }> = ({ initialValue = false }) => {
    const [isOn, setIsOn] = useState(initialValue);
    
    return (
        <div 
            onClick={() => setIsOn(!isOn)}
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isOn ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'}`}
        >
            <motion.div 
                layout 
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                className="w-6 h-6 bg-white rounded-full" 
            />
        </div>
    );
};

export default ToggleSwitch;