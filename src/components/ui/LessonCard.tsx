import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, ChevronRight } from 'lucide-react';
import Button from './Button';

interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    description: string;
    isLocked: boolean;
    isCompleted: boolean;
    icon: string;
  };
  keysRemaining: number;
  onStartLesson: (lessonId: number) => void;
  onUseKey: (lessonId: number) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  keysRemaining,
  onStartLesson,
  onUseKey,
}) => {
  const { id, title, description, isLocked, isCompleted, icon } = lesson;

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={`bg-white rounded-xl shadow-md overflow-hidden ${
        !isLocked && !isCompleted ? 'animate-pulse-slow' : ''
      }`}
    >
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
      
      <div className="p-4 bg-gray-50">
        {isLocked ? (
          <Button
            variant="outline"
            fullWidth
            onClick={() => onUseKey(id)}
            disabled={keysRemaining === 0}
          >
            Use Key ({keysRemaining} left)
          </Button>
        ) : isCompleted ? (
          <Button
            variant="primary"
            fullWidth
            onClick={() => onStartLesson(id)}
          >
            Practice Again
          </Button>
        ) : (
          <Button
            variant="primary"
            fullWidth
            onClick={() => onStartLesson(id)}
          >
            Start
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default LessonCard;