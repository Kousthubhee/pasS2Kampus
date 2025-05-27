import React from 'react';
import { CheckCircle, Lock } from 'lucide-react';
import { ChecklistItem as ChecklistItemType } from '../../context/AppContext';

interface Props {
  item: ChecklistItemType;
  onToggle: () => void;
}

const ChecklistItem: React.FC<Props> = ({ item, onToggle }) => {
  const isLocked = item.isLocked;

  return (
    <div
      className={`flex items-start justify-between p-3 mb-3 rounded-md border shadow-sm 
        ${isLocked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50 cursor-pointer'}
      `}
      onClick={() => {
        if (!isLocked) onToggle();
      }}
    >
      <div>
        <div className="flex items-center gap-2">
          {item.isCompleted ? (
            <CheckCircle className="text-green-500 w-5 h-5" />
          ) : isLocked ? (
            <Lock className="w-5 h-5" />
          ) : (
            <div className="w-5 h-5 border border-gray-400 rounded-full" />
          )}
          <span className={`font-medium ${isLocked ? 'line-through' : ''}`}>{item.text}</span>
        </div>
        {item.details && !isLocked && (
          <p className="text-sm text-gray-500 ml-7 mt-1">{item.details}</p>
        )}
      </div>
    </div>
  );
};

export default ChecklistItem;
