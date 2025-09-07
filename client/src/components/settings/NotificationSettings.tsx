import React from 'react';
import { motion } from 'framer-motion';
import ToggleSwitch from './ToggleSwitch'; // Our new toggle switch

const SettingRow: React.FC<{ label: string; description: string; children: React.ReactNode }> = ({ label, description, children }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-6 border-b border-gray-200">
         <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-800">{label}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="md:col-span-2 flex justify-start">
            {children}
        </div>
    </div>
);


const NotificationsSettings: React.FC = () => {
    return (
         <motion.div
            key="notifications"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
             <h2 className="text-2xl font-bold font-poppins mb-6">Notifications</h2>
             
             <SettingRow label="Email Notifications" description="Receive emails about mentions and new messages.">
                <ToggleSwitch initialValue={true}/>
            </SettingRow>

            <SettingRow label="Push Notifications" description="Get notified on your desktop or mobile device.">
                <ToggleSwitch initialValue={true}/>
            </SettingRow>

             <SettingRow label="Message Preview" description="Show a preview of the message in the notification.">
                <ToggleSwitch />
            </SettingRow>

             <SettingRow label="Notification Sounds" description="Play a sound when a new notification arrives.">
                <ToggleSwitch initialValue={true}/>
            </SettingRow>
        </motion.div>
    );
};

export default NotificationsSettings;