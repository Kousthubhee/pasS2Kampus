import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle, MessageSquare, Users, Newspaper, Link as LinkIcon, BookOpen, Languages, Bell, User, Mail } from 'lucide-react';

interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const navItems = [
    { path: '/', label: 'Checklist', icon: <CheckCircle size={20} /> },
    { path: '/qa', label: 'Ask Me Anything', icon: <MessageSquare size={20} /> },
    { path: '/hub', label: 'Community Hub', icon: <Users size={20} /> },
    { path: '/news', label: 'Stay Updated', icon: <Newspaper size={20} /> },
    { path: '/affiliations', label: 'Our Partners', icon: <LinkIcon size={20} /> },
    { path: '/language', label: 'Learn French', icon: <BookOpen size={20} /> },
    { path: '/translate', label: 'Translate', icon: <Languages size={20} /> },
    { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/contact', label: 'Contact Us', icon: <Mail size={20} /> },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          pas<span className="text-[#00BFFF]">S</span>2<span className="text-[#00BFFF]">K</span>ampus
        </h2>
        <p className="text-sm text-gray-600 mt-1">Your guide to French education</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-primary-50 p-4 rounded-lg">
          <h3 className="font-medium text-primary-700">Need Help?</h3>
          <p className="text-sm text-gray-600 mt-1">
            Reach out to our support team for assistance
          </p>
          <NavLink
            to="/contact"
            onClick={closeSidebar}
            className="mt-2 w-full py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors flex items-center justify-center"
          >
            Contact Support
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;