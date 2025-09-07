import React from 'react';
import { motion} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, Phone, MapPin, Share2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const formVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};


const ContactPage: React.FC = () => {
    return (
        <div className="bg-white">
            <Header />

            <main className="container mx-auto px-6 py-24">
                 <div className="text-center mb-16">
                    <h1 className="font-poppins text-5xl font-bold">Get In Touch</h1>
                    <p className="text-lg text-gray-600 mt-4">We'd love to hear from you. Let's get a conversation started.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Info */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants} className="flex items-start gap-6">
                            <div className="bg-blue-100 p-4 rounded-xl text-blue-600"><Mail size={28}/></div>
                            <div>
                                <h3 className="font-poppins font-semibold text-xl">Email Our Team</h3>
                                <p className="text-gray-600 mt-1">General inquiries? We're on it. Send us an email and we'll get back to you shortly.</p>
                                <a href="mailto:hello@connectsphere.com" className="text-blue-600 font-semibold mt-2 inline-block hover:underline">hello@connectsphere.com</a>
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex items-start gap-6">
                            <div className="bg-blue-100 p-4 rounded-xl text-blue-600"><MapPin size={28}/></div>
                            <div>
                                <h3 className="font-poppins font-semibold text-xl">Visit Our Office</h3>
                                <p className="text-gray-600 mt-1">Come say hello at our headquarters. We'd love to host you for a coffee.</p>
                                <p className="font-semibold mt-2 text-gray-800">123 Connection Ave, San Francisco, CA</p>
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex items-start gap-6">
                            <div className="bg-blue-100 p-4 rounded-xl text-blue-600"><Share2 size={28}/></div>
                            <div>
                                <h3 className="font-poppins font-semibold text-xl">Follow Our Socials</h3>
                                <p className="text-gray-600 mt-1">Follow us on social media for the latest product updates and news.</p>
                                <div className="flex space-x-4 mt-3">
                                   <a href="#" className="text-gray-500 hover:text-blue-600">Twitter</a>
                                   <a href="#" className="text-gray-500 hover:text-blue-600">LinkedIn</a>
                                   <a href="#" className="text-gray-500 hover:text-blue-600">Instagram</a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                         variants={formVariants}
                         initial="hidden"
                         animate="visible"
                         className="bg-gray-50 p-8 rounded-2xl border border-gray-100"
                    >
                         <form className="space-y-6">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                <input type="text" id="name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                                <textarea id="message" rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                             <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Send Message
                            </motion.button>
                         </form>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;