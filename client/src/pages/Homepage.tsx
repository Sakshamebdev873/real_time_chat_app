import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50 font-lato text-gray-800">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
         <HowItWorks />    
        <Testimonials />   
        <CTASection />      
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;