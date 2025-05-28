import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChecklistModule } from '../types/checklist';
import * as modules from '../data/modules';

const initialModules = Object.values(modules);

interface ModulesStore {
  modules: ChecklistModule[];
  completeItem: (moduleId: number, itemId: string) => void;
  unlockModule: (moduleId: number) => void;
  resetProgress: () => void;
}

export const useModulesStore = create<ModulesStore>()(
  persist(
    (set) => ({
      modules: initialModules,
      completeItem: (moduleId, itemId) =>
        set((state) => {
          const newModules = [...state.modules];
          const moduleIndex = newModules.findIndex((m) => m.id === moduleId);
          
          if (moduleIndex === -1) return state;
          
          const module = {...newModules[moduleIndex]};
          const itemIndex = module.items.findIndex((i) => i.id === itemId);
          
          if (itemIndex === -1) return state;
          
          const newItems = [...module.items];
          newItems[itemIndex] = {
            ...newItems[itemIndex],
            isCompleted: !newItems[itemIndex].isCompleted,
          };
          
          module.items = newItems;
          module.isCompleted = newItems.every((item) => item.isCompleted);
          
          if (module.isCompleted && moduleIndex < newModules.length - 1) {
            newModules[moduleIndex + 1].isLocked = false;
          }
          
          newModules[moduleIndex] = module;
          return { modules: newModules };
        }),
      unlockModule: (moduleId) =>
        set((state) => {
          const newModules = [...state.modules];
          const moduleIndex = newModules.findIndex((m) => m.id === moduleId);
          
          if (moduleIndex === -1) return state;
          
          newModules[moduleIndex] = {
            ...newModules[moduleIndex],
            isLocked: false,
          };
          
          return { modules: newModules };
        }),
      resetProgress: () => set({ modules: initialModules }),
    }),
    {
      name: 'modules-storage',
    }
  )
);