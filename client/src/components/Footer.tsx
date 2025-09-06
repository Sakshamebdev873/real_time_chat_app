import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="font-poppins text-xl font-bold text-blue-600 mb-4">
              ConnectSphere
            </h2>
            <p className="text-gray-500 pr-4">
              The modern chat application for teams who value clarity and speed.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div>
            <h3 className="font-poppins font-semibold text-gray-800 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-500 hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-500 hover:text-blue-600 transition-colors">Pricing</a></li>
              <li><a href="/integrations" className="text-gray-500 hover:text-blue-600 transition-colors">Integrations</a></li>
              <li><a href="/updates" className="text-gray-500 hover:text-blue-600 transition-colors">Updates</a></li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h3 className="font-poppins font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-500 hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-gray-500 hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="/contact" className="text-gray-500 hover:text-blue-600 transition-colors">Contact</a></li>
              <li><a href="/press" className="text-gray-500 hover:text-blue-600 transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h3 className="font-poppins font-semibold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-500 hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="text-gray-500 hover:text-blue-600 transition-colors">Cookie Settings</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Socials */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ConnectSphere. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-blue-600 transition-colors text-2xl"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-blue-600 transition-colors text-2xl"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-600 transition-colors text-2xl"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-blue-600 transition-colors text-2xl"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;