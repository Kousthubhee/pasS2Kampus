import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { ChecklistItem as ChecklistItemType } from '../../types/checklist';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: () => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggle }) => {
  const [expanded, setExpanded] = React.useState(false);
  const hasDetails = !!item.details;
  
  return (
    <div className={`border rounded-lg mb-3 ${item.isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
      <div 
        className="checklist-item cursor-pointer"
        onClick={onToggle}
      >
        <motion.div whileTap={{ scale: 0.95 }}>
          {item.isCompleted ? (
            <CheckCircle className="text-green-500 flex-shrink-0\" size={22} />
          ) : (
            <Circle className="text-gray-400 flex-shrink-0\" size={22} />
          )}
        </motion.div>
        
        <div className="flex-1">
          <p className={`${item.isCompleted ? 'text-green-700' : 'text-gray-700'} font-medium`}>
            {item.text}
          </p>
        </div>
        
        {hasDetails && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            {expanded ? (
              <ChevronUp size={18} className="text-gray-500" />
            ) : (
              <ChevronDown size={18} className="text-gray-500" />
            )}
          </button>
        )}
      </div>
      
      {hasDetails && expanded && (
        <div className="px-10 pb-4 pt-1 text-sm text-gray-600">
          {item.details}
        </div>
      )}
    </div>
  );
};

export default ChecklistItem;