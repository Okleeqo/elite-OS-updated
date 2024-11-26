import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';

interface OfferLabHeaderProps {
  onToggleSidebar: () => void;
  onBack: () => void;
}

const OfferLabHeader: React.FC<OfferLabHeaderProps> = ({ onToggleSidebar, onBack }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onToggleSidebar}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={onBack}
                className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Offer Creation
              </button>
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">OfferLab</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OfferLabHeader;