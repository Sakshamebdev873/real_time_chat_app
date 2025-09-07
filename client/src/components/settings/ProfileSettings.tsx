import React, { useState } from 'react';
import { motion } from 'framer-motion';

// A reusable component for each setting row
const SettingRow: React.FC<{ label: string; description: string; children: React.ReactNode }> = ({ label, description, children }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-6 border-b border-gray-200">
        <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-800">{label}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="md:col-span-2">
            {children}
        </div>
    </div>
);


const ProfileSettings: React.FC = () => {
    const [profile, setProfile] = useState({
        username: 'Alicia Keys',
        email: 'alicia.keys@example.com',
        bio: 'Grammy-winning artist and producer. Spreading love and light through music.',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    return (
        <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold font-poppins mb-6">Public Profile</h2>

            <SettingRow label="Username" description="This will be displayed on your profile.">
                <input type="text" name="username" value={profile.username} onChange={handleChange} className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg"/>
            </SettingRow>

            <SettingRow label="Bio" description="A short description about yourself.">
                <textarea name="bio" rows={3} value={profile.bio} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
            </SettingRow>

             <SettingRow label="Profile Photo" description="This will be your avatar across the app.">
                <div className="flex items-center gap-4">
                    <img src="https://i.pravatar.cc/150?u=alicia-keys" alt="Current Avatar" className="w-16 h-16 rounded-full"/>
                    <button className="bg-gray-100 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200">
                        Change Photo
                    </button>
                </div>
            </SettingRow>

            <div className="flex justify-end pt-8">
                <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700">
                    Save Changes
                </button>
            </div>
        </motion.div>
    );
};

export default ProfileSettings;