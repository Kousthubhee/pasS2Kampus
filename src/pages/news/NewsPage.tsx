import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, AlertTriangle, Info, Bell } from 'lucide-react';

const NewsPage: React.FC = () => {
  // Sample news data
  const newsItems = [
    {
      id: 1,
      category: 'visa',
      title: 'New VFS Appointment System for Student Visas',
      content: 'VFS Global has updated their appointment booking system for student visa applications. Students can now book appointments up to 3 months in advance.',
      date: 'June 15, 2025',
      important: true,
      source: 'Campus France',
    },
    {
      id: 2,
      category: 'campus',
      title: 'NEOMA Business School Announces New Scholarship for Indian Students',
      content: 'NEOMA Business School has announced a new scholarship program specifically for Indian students, covering up to 30% of tuition fees for eligible candidates.',
      date: 'June 10, 2025',
      important: false,
      source: 'NEOMA BS',
    },
    {
      id: 3,
      category: 'alert',
      title: 'Potential Transportation Strikes in Paris Next Month',
      content: 'Transportation unions in Paris have announced potential strikes for July 2025. Students traveling to Paris during this period should plan accordingly.',
      date: 'June 8, 2025',
      important: true,
      source: 'RATP',
    },
    {
      id: 4,
      category: 'policy',
      title: 'Changes to Post-Study Work Visa Regulations',
      content: 'The French government has announced changes to post-study work visa regulations, extending the eligibility period from 1 to 2 years for Masters graduates.',
      date: 'June 5, 2025',
      important: true,
      source: 'Ministry of Higher Education',
    },
    {
      id: 5,
      category: 'campus',
      title: 'SKEMA Business School Launches New AI Program',
      content: 'SKEMA Business School has launched a new specialized program in Artificial Intelligence and Data Science, with applications opening next month.',
      date: 'June 1, 2025',
      important: false,
      source: 'SKEMA BS',
    },
  ];
  
  // Category icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'visa':
        return <Info size={18} className="text-blue-500" />;
      case 'campus':
        return <Bell size={18} className="text-green-500" />;
      case 'alert':
        return <AlertTriangle size={18} className="text-orange-500" />;
      case 'policy':
        return <Info size={18} className="text-purple-500" />;
      default:
        return <Info size={18} className="text-gray-500" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'visa':
        return 'bg-blue-100 text-blue-800';
      case 'campus':
        return 'bg-green-100 text-green-800';
      case 'alert':
        return 'bg-orange-100 text-orange-800';
      case 'policy':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
    >
      <div className="section-title">
        <Newspaper size={24} />
        Stay Updated
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Featured news */}
        <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
          <div className="flex items-center mb-2">
            <AlertTriangle size={20} className="mr-2" />
            <h3 className="text-sm font-medium uppercase">Important Update</h3>
          </div>
          <h2 className="text-xl font-bold mb-2">Campus France Application Deadline Extended</h2>
          <p className="text-sm opacity-90 mb-4">
            Campus France has extended the application deadline for the Fall 2025 intake by two weeks. Students now have until July 15th to complete their applications.
          </p>
          <div className="flex items-center text-xs opacity-75">
            <Calendar size={14} className="mr-1" />
            <span>June 18, 2025</span>
          </div>
        </div>
        
        {/* News list */}
        <div className="divide-y divide-gray-200">
          {newsItems.map((item) => (
            <div key={item.id} className={`p-4 ${item.important ? 'bg-amber-50' : ''}`}>
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">{item.source}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.content}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsPage;