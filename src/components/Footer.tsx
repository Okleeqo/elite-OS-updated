import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Elite Advisor OS™️</h3>
            <p className="text-gray-400">Empowering financial advisors with cutting-edge tools and strategies.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/tools-apps" className="text-gray-400 hover:text-white">Tools & Apps</a></li>
              <li><a href="/goals-to-action" className="text-gray-400 hover:text-white">Goals-to-Action Map</a></li>
              <li><a href="/offer-creation" className="text-gray-400 hover:text-white">Offer Creation</a></li>
              <li><a href="/scheduling" className="text-gray-400 hover:text-white">Scheduling</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-gray-400">Email: support@eliteadvisor.com</p>
            <p className="text-gray-400">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; 2024 Elite Advisor OS™️. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;