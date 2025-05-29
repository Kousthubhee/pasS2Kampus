import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Users, DollarSign, GraduationCap, Building, Coffee, Train, Info } from 'lucide-react';
import { useSchoolStore } from '../../store/useSchoolStore';
import Button from '../../components/ui/Button';

const SchoolPage: React.FC = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const { schools } = useSchoolStore();
  
  const school = schools.find(s => s.id === schoolId);
  
  if (!school) {
    return (
      <div className="page-container">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">School not found</h2>
          <Button onClick={() => navigate('/')}>Return to Checklist</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
    >
      {/* Hero Section */}
      <div className="relative h-64 rounded-xl overflow-hidden mb-6">
        <img
          src={school.imageUrl}
          alt={school.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{school.name}</h1>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>{school.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-600 mb-6">{school.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Users className="text-primary-600 mr-3" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Campuses</p>
                  <p className="font-medium">{school.campuses.length} Locations</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <DollarSign className="text-primary-600 mr-3" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Cost of Living</p>
                  <p className="font-medium">{school.costOfLiving}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Programs Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {school.programsOffered.map((program, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <GraduationCap className="text-primary-600 mr-3" size={20} />
                  <span>{program}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Local Insights */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Local Insights</h2>
            <div className="grid grid-cols-1 gap-4">
              {school.localInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start">
                    {insight.category === 'housing' && <Building className="text-blue-600 mr-3\" size={20} />}
                    {insight.category === 'food' && <Coffee className="text-orange-600 mr-3" size={20} />}
                    {insight.category === 'transport' && <Train className="text-green-600 mr-3\" size={20} />}
                    {insight.category === 'tips' && <Info className="text-purple-600 mr-3" size={20} />}
                    <div>
                      <h3 className="font-medium mb-1">{insight.title}</h3>
                      <p className="text-gray-600 text-sm">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Campus Locations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Campus Locations</h2>
            <div className="space-y-3">
              {school.campuses.map((campus, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <Building className="text-primary-600 mr-3" size={20} />
                  <span>{campus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => window.open(school.website, '_blank')}
              >
                Visit Website
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/contact')}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SchoolPage;