import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext, ChecklistModule as ChecklistModuleType } from '../../context/AppContext';
import LessonCard from '../../components/ui/LessonCard';
import ChecklistItem from '../../components/ui/ChecklistItem';
import Button from '../../components/ui/Button';
import SchoolCard from '../../components/ui/SchoolCard';
import { ArrowLeft, Sparkles, School } from 'lucide-react';

const ChecklistPage: React.FC = () => {
  const { 
    modules, 
    completeItem, 
    selectedSchool, 
    setSelectedSchool, 
    schools,
    keysRemaining,
    useKey 
  } = useAppContext();
  const [selectedModule, setSelectedModule] = useState<ChecklistModuleType | null>(null);
  const [showSchools, setShowSchools] = useState(false);

  // Handle module click
  const handleModuleClick = (module: ChecklistModuleType) => {
    if (module.id === 1 && !selectedModule) {
      setShowSchools(true);
    } else {
      setSelectedModule(module);
      setShowSchools(false);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    if (selectedSchool && showSchools) {
      setSelectedSchool(null);
    } else if (showSchools) {
      setShowSchools(false);
    } else {
      setSelectedModule(null);
    }
  };

  // Handle school click
  const handleSchoolClick = (school: any) => {
    setSelectedSchool(school);
  };

  // Determine what content to show
  const renderContent = () => {
    if (showSchools) {
      if (selectedSchool) {
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <img 
                src={selectedSchool.imageUrl} 
                alt={selectedSchool.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedSchool.name}</h2>
              <p className="text-gray-600 mb-4">{selectedSchool.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Campuses</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedSchool.campuses.map((campus, index) => (
                      <li key={index}>{campus}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Cost of Living</h3>
                  <p className="text-gray-600">{selectedSchool.costOfLiving}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Programs Offered</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedSchool.programsOffered.map((program, index) => (
                    <li key={index}>{program}</li>
                  ))}
                </ul>
              </div>
              
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  setShowSchools(false);
                  setSelectedModule(modules[0]);
                }}
                rightIcon={<Sparkles size={16} />}
              >
                Continue to Checklist
              </Button>
            </div>
          </div>
        );
      } else {
        return (
          <>
            <h2 className="section-title">
              <School size={24} />
              Select a School
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  onClick={() => handleSchoolClick(school)}
                />
              ))}
            </div>
          </>
        );
      }
    } else if (selectedModule) {
      return (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">{selectedModule.icon}</span>
            <h2 className="text-2xl font-bold text-gray-800">{selectedModule.title}</h2>
          </div>
          
          <p className="text-gray-600 mb-6">{selectedModule.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Checklist</h3>
            {selectedModule.items.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                onToggle={() => completeItem(selectedModule.id, item.id)}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <h1 className="section-title">
            <Sparkles size={24} />
            🎯 Checklist – Begin Your Journey
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <LessonCard
                key={module.id}
                lesson={module}
                keysRemaining={keysRemaining}
                onStartLesson={() => handleModuleClick(module)}
                onUseKey={() => useKey(module.id)}
              />
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
    >
      {(selectedModule || showSchools) && (
        <Button
          variant="outline"
          size="sm"
          leftIcon={<ArrowLeft size={16} />}
          onClick={handleBackClick}
          className="mb-6"
        >
          Back
        </Button>
      )}
      
      {renderContent()}
    </motion.div>
  );
};

export default ChecklistPage