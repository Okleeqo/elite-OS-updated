import React from 'react';
import { 
  LayoutDashboard, 
  Workflow, 
  Bell, 
  Settings, 
  Target, 
  Hammer 
} from 'lucide-react';

interface OfferLabSidebarProps {
  isOpen: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const OfferLabSidebar: React.FC<OfferLabSidebarProps> = ({
  isOpen,
  activeSection,
  onSectionChange
}) => {
  const sections = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'workflows', name: 'Workflows', icon: Workflow },
    { id: 'delivery', name: 'Delivery', icon: Bell },
    { id: 'frameworks', name: 'Frameworks', icon: Settings }
  ];

  return (
    <aside className={`${
      isOpen ? 'w-64' : 'w-20'
    } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex-shrink-0`}>
      <div className="h-full flex flex-col">
        <div className="p-4">
          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {isOpen && <span className="ml-3">{section.name}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default OfferLabSidebar;