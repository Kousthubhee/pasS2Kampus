import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useModulesStore } from '../../store/useModulesStore';
import { useKeysStore } from '../../store/useKeysStore';
import { ChecklistModule } from '../../types/checklist';
import ModuleCard from '../../components/ui/ModuleCard';
import ChecklistItem from '../../components/ui/ChecklistItem';
import Button from '../../components/ui/Button';
import { ArrowLeft, Key, Sparkles } from 'lucide-react';

const ChecklistPage: React.FC = () => {
  const { modules, completeItem, unlockModule } = useModulesStore();
  const { keysRemaining, useKey } = useKeysStore();
  const [selectedModule, setSelectedModule] = useState<ChecklistModule | null>(null);

  const handleModuleClick = (module: ChecklistModule) => {
    if (!module.isLocked) {
      setSelectedModule(module);
    }
  };

  const handleUnlockModule = (moduleId: number) => {
    if (keysRemaining > 0) {
      useKey();
      unlockModule(moduleId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
    >
      {selectedModule ? (
        <>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => setSelectedModule(null)}
            className="mb-6"
          >
            Back to Modules
          </Button>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">{selectedModule.icon}</span>
              <h2 className="text-2xl font-bold text-gray-800">{selectedModule.title}</h2>
            </div>
            
            <p className="text-gray-600 mb-6">{selectedModule.description}</p>
            
            <div className="space-y-3">
              {selectedModule.items.map((item) => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  onToggle={() => completeItem(selectedModule.id, item.id)}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="section-title flex items-center">
              <Sparkles size={24} className="mr-2" />
              Your Journey Checklist
            </h1>
            <div className="flex items-center bg-amber-100 px-4 py-2 rounded-lg">
              <Key size={20} className="text-amber-600 mr-2" />
              <span className="text-amber-700 font-medium">
                {keysRemaining} {keysRemaining === 1 ? 'key' : 'keys'} remaining
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                keysRemaining={keysRemaining}
                onModuleClick={() => handleModuleClick(module)}
                onUnlock={() => handleUnlockModule(module.id)}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ChecklistPage;