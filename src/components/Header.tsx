import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LayoutDashboard, FileText, Users, Calendar, Briefcase, Bell } from 'lucide-react';
import { useNotificationStore } from '../stores/notificationStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const unreadCount = useNotificationStore((state) => state.getUnreadCount());

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/tools-apps', label: 'Tools & Apps', icon: FileText },
    { to: '/offer-creation', label: 'Offer Creation', icon: FileText },
    { to: '/scheduling', label: 'Engage Hub', icon: Calendar },
    { to: '/client-management', label: 'Client Management', icon: Briefcase }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            Elite Advisor OS™️
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActiveRoute(item.to)
                    ? 'bg-emerald-100 text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-emerald-600'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-2 ${
                  isActiveRoute(item.to)
                    ? 'text-emerald-600'
                    : 'text-gray-500 group-hover:text-emerald-600'
                }`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Link 
              to="/client-management/notifications" 
              className="relative text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
            <Link 
              to="/profile" 
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <User size={24} />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-emerald-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-white py-4 px-4 border-t">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActiveRoute(item.to)
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-emerald-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;