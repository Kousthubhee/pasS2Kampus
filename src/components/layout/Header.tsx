import React from 'react';
import { GraduationCap as Graduation, Bell, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Graduation className="text-primary-600" size={32} />
          <h1 className="text-xl font-bold">
            pas<span className="text-[#00BFFF]">S</span>2<span className="text-[#00BFFF]">K</span>ampus
          </h1>
        </Link>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/notifications')}
            className="p-2 rounded-full hover:bg-gray-100" 
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-600" />
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100" 
            aria-label="Profile"
          >
            <User size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;