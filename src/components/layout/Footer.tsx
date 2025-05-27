import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 flex items-center justify-center">
          🎓 © {new Date().getFullYear()} Kousthubhee Krishna • Srivatsava • Made for students
        </p>
        <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-500">
          <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;