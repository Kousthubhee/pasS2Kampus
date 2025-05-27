import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <p className="text-gray-600 text-center">No new notifications</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;