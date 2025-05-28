import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../../components/ui/Button';

const ContactPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3" />
                <a href="mailto:kousthubheekrishna@gmail.com" className="hover:text-primary-600">
                  kousthubheekrishna@gmail.com
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3" />
                <span>Available on request</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span>Rouen, France</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <p className="text-primary-700">
                <strong>Creator:</strong> Kousthubhee Krishna Kotte & Srivatsava
              </p>
              <p className="text-primary-600 mt-2">
                Helping students navigate their journey to study in France
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                  placeholder="Your message"
                ></textarea>
              </div>
              <Button
                variant="primary"
                fullWidth
                rightIcon={<Send size={16} />}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;