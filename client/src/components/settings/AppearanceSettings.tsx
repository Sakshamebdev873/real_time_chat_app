import React from 'react'; // We no longer need useState here
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Check } from 'lucide-react';
 // <-- 1. IMPORT THE GLOBAL CONTEXT HOOK

// A reusable, slightly modified SettingRow for this component
const SettingRow: React.FC<{ label: string; description: string; children: React.ReactNode }> = ({ label, description, children }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-6 border-b border-gray-200 last:border-b-0">
        <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{label}</h3> {/* Added dark mode text color */}
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <div className="md:col-span-2">
            {children}
        </div>
    </div>
);

// Define our color options
const accentColors = [
    { name: 'blue', class: 'bg-blue-600', ring: 'ring-blue-300' },
    { name: 'purple', class: 'bg-purple-600', ring: 'ring-purple-300' },
    { name: 'green', class: 'bg-green-600', ring: 'ring-green-300' },
    { name: 'orange', class: 'bg-orange-500', ring: 'ring-orange-300' },
];

const AppearanceSettings: React.FC = () => {
    // 2. GET THEME AND SETTERS FROM THE GLOBAL CONTEXT
    // This replaces your local useState hooks.
   

    return (
        <motion.div
            key="appearance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold font-poppins mb-6 dark:text-white">Appearance</h2>

            {/* Theme Selector */}
            <SettingRow label="Theme" description="Choose a light or dark theme for the entire app.">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                    {/* Light Theme Card */}
                    <button
                        // 3. ON CLICK, CALL THE GLOBAL SETTER FUNCTION
                      
                        className={`p-4 border-2 rounded-lg text-left border-primary ring-2 ring-blue-500/50' : 'border-border`}
                    >
                        <div className="flex items-center gap-2 mb-2 font-semibold dark:text-gray-200">
                            <Sun size={18} /> Light
                        </div>
                        <div className="h-20 bg-gray-50 rounded-md p-2 flex gap-1">
                           <div className="w-1/4 bg-gray-200 rounded-sm"></div>
                           <div className="flex-1 bg-white border border-gray-200 rounded-sm"></div>
                        </div>
                    </button>
                    {/* Dark Theme Card */}
                     <button
                        // 3. ON CLICK, CALL THE GLOBAL SETTER FUNCTION
                    
                        className={`p-4 border-2 rounded-lg text-left  'border-primary ring-2 ring-blue-500/50' : 'border-border`}
                    >
                         <div className="flex items-center gap-2 mb-2 font-semibold dark:text-gray-200">
                            <Moon size={18} /> Dark
                        </div>
                         <div className="h-20 bg-gray-800 rounded-md p-2 flex gap-1">
                           <div className="w-1/4 bg-gray-700 rounded-sm"></div>
                           <div className="flex-1 bg-gray-900 border border-gray-700 rounded-sm"></div>
                        </div>
                    </button>
                </div>
            </SettingRow>

            {/* Accent Color Selector */}
            <SettingRow label="Accent Color" description="Select your preferred accent color for highlights and buttons.">
                <div className="flex items-center gap-3">
                    {accentColors.map(color => (
                        <button
                            key={color.name}
                            // 3. ON CLICK, CALL THE GLOBAL SETTER FUNCTION
                            
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all `}
                        >
                            <AnimatePresence>
                               {
                                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                      <Check size={18} className="text-white"/>
                                   </motion.div>
                               }
                            </AnimatePresence>
                        </button>
                    ))}
                </div>
            </SettingRow>
             
            {/* 4. THE SAVE BUTTON IS NO LONGER NEEDED! 
                You can remove this entire div. The changes apply instantly. */}
            {/* <div className="flex justify-end pt-8 mt-6">
                <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700">
                    Save Changes
                </button>
            </div> */}
        </motion.div>
    );
};

export default AppearanceSettings;