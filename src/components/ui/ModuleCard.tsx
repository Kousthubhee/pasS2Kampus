import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, ChevronRight } from 'lucide-react';
import { ChecklistModule } from '../../context/AppContext';

interface ModuleCardProps {
  module: ChecklistModule;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  const { title, icon, description, isLocked, isCompleted, items } = module;
  
  // Calculate progress
  const completedItems = items.filter(item => item.isCompleted).length;
  const progress = items.length > 0 ? (completedItems / items.length) * 100 : 0;
  
  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={`module-card ${isLocked ? 'locked' : 'unlocked'}`}
      onClick={!isLocked ? onClick : undefined}
    >
      {/* Module Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{icon}</span>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          {isLocked ? (
            <Lock className="text-gray-400" size={20} />
          ) : isCompleted ? (
            <div className="bg-green-100 text-green-700 p-1 rounded-full">
              <Check size={18} />
            </div>
          ) : (
            <ChevronRight className="text-primary-500" size={20} />
          )}
        </div>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
      </div>
      
      {/* Progress Bar */}
      <div className="px-5 py-3 bg-gray-50">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{completedItems} of {items.length} completed</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-primary-500'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;