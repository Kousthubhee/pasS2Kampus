import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Types
export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
  isLocked: boolean;
  details?: string;
}

export interface ChecklistModule {
  id: number;
  title: string;
  icon: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
  items: ChecklistItem[];
}

export interface School {
  id: string;
  name: string;
  location: string;
  description: string;
  campuses: string[];
  costOfLiving: string;
  programsOffered: string[];
  imageUrl: string;
}

interface AppContextType {
  modules: ChecklistModule[];
  completeItem: (moduleId: number, itemId: string) => void;
  unlockModule: (moduleId: number) => void;
  resetProgress: () => void;
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
  schools: School[];
  keysRemaining: number;
  useKey: (moduleId: number) => void;
  earnKey: () => void;
  isUnlocked: (required?: number) => boolean;
}

// Default context
const AppContext = createContext<AppContextType>({} as AppContextType);

// Sample initialModules (shortened here, update your real module list accordingly)
const initialModules: ChecklistModule[] = [
  {
    id: 1,
    title: "School",
    icon: "🏫",
    description: "Explore French business schools",
    isCompleted: false,
    isLocked: false,
    items: [
      { id: "1-1", text: "Research programs", isCompleted: false, isLocked: false },
      { id: "1-2", text: "Compare costs", isCompleted: false, isLocked: true },
      { id: "1-3", text: "Check admission criteria", isCompleted: false, isLocked: true },
    ],
  },
  {
    id: 2,
    title: "Pre-Arrival Checklist (Part 1)",
    icon: "✈️",
    description: "Before departure: Visa, Campus France, docs, flight",
    isCompleted: false,
    isLocked: true,
    items: [
      { id: "2-1", text: "Complete Campus France application", isCompleted: false, isLocked: false },
      { id: "2-2", text: "Schedule VFS visa appointment", isCompleted: false, isLocked: true },
      { id: "2-3", text: "Book flights", isCompleted: false, isLocked: true },
    ],
  },
];

// School data
const schoolsData: School[] = [
  {
    id: "neoma",
    name: "NEOMA Business School",
    location: "Reims, Rouen, Paris",
    description: "NEOMA Business School is a French business school with campuses in Reims, Rouen, and Paris. Known for its international approach and strong alumni network.",
    campuses: ["Reims", "Rouen", "Paris"],
    costOfLiving: "€800-1,200/month",
    programsOffered: ["Master in Management", "MSc in Finance", "MSc in Marketing", "MBA", "Bachelor in Business Administration"],
    imageUrl: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg"
  },
  {
    id: "skema",
    name: "SKEMA Business School",
    location: "Lille, Paris, Sophia Antipolis, Belo Horizonte, Suzhou, Raleigh, Cape Town",
    description: "SKEMA is a global business school with campuses across three continents. It offers a multicultural learning environment with strong industry connections.",
    campuses: ["Lille", "Paris", "Sophia Antipolis", "Belo Horizonte", "Suzhou", "Raleigh", "Cape Town"],
    costOfLiving: "€850-1,300/month",
    programsOffered: ["BBA in Global Management", "Master in Management", "MSc in Financial Markets", "MSc in International Business"],
    imageUrl: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg"
  },
  {
    id: "kedge",
    name: "KEDGE Business School",
    location: "Bordeaux, Marseille, Paris, Toulon",
    description: "KEDGE is a French business school with a focus on innovation and entrepreneurship. It's known for its strong corporate connections and practical teaching approach.",
    campuses: ["Bordeaux", "Marseille", "Paris", "Toulon"],
    costOfLiving: "€750-1,100/month",
    programsOffered: ["International BBA", "MSc in Marketing", "MSc in Finance", "MBA in Global Business"],
    imageUrl: "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg"
  },
  {
    id: "audencia",
    name: "Audencia Business School",
    location: "Nantes, Paris",
    description: "Audencia is a leading European business school based in Nantes, with a strong focus on responsible management and sustainability.",
    campuses: ["Nantes", "Paris"],
    costOfLiving: "€700-1,000/month",
    programsOffered: ["Master in Management", "MSc in Supply Chain", "MBA in Chief Value Officer", "International Master in Management"],
    imageUrl: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
  },
  {
    id: "emstrasbourg",
    name: "EM Strasbourg Business School",
    location: "Strasbourg",
    description: "EM Strasbourg is the business school of the University of Strasbourg, offering programs with a strong European and international focus.",
    campuses: ["Strasbourg"],
    costOfLiving: "€750-1,050/month",
    programsOffered: ["Bachelor in European Management", "Master in Management", "MSc in International Business Development", "MBA in European Management"],
    imageUrl: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg"
  }
];


export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [modules, setModules] = useState<ChecklistModule[]>(() => {
    const savedModules = localStorage.getItem('checklist-modules');
    return savedModules ? JSON.parse(savedModules) : initialModules;
  });

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schools] = useState<School[]>(schoolsData);
  const [keysRemaining, setKeysRemaining] = useState(() => {
    const savedKeys = localStorage.getItem('keys-remaining');
    return savedKeys ? parseInt(savedKeys, 10) : 3;
  });

  useEffect(() => {
    localStorage.setItem('checklist-modules', JSON.stringify(modules));
    localStorage.setItem('keys-remaining', keysRemaining.toString());
  }, [modules, keysRemaining]);

  const earnKey = () => setKeysRemaining(prev => prev + 1);
  const isUnlocked = (required: number = 1) => keysRemaining >= required;

  const useKey = (moduleId: number) => {
    if (keysRemaining > 0) {
      setKeysRemaining(prev => prev - 1);
      setModules(prevModules => {
        const newModules = [...prevModules];
        const modIndex = newModules.findIndex(m => m.id === moduleId);
        if (modIndex !== -1) newModules[modIndex].isLocked = false;
        return newModules;
      });
    }
  };

  const completeItem = (moduleId: number, itemId: string) => {
    setModules(prevModules => {
      const newModules = [...prevModules];
      const moduleIndex = newModules.findIndex(m => m.id === moduleId);
      if (moduleIndex === -1) return prevModules;

      const module = { ...newModules[moduleIndex] };
      const itemIndex = module.items.findIndex(i => i.id === itemId);
      if (itemIndex === -1) return prevModules;

      const item = module.items[itemIndex];
      item.isCompleted = !item.isCompleted;

      // Unlock next item if current is now completed
      if (item.isCompleted && itemIndex + 1 < module.items.length) {
        module.items[itemIndex + 1].isLocked = false;
      }

      // Check if all items complete
      const allCompleted = module.items.every(i => i.isCompleted);
      module.isCompleted = allCompleted;

      // If module is complete: earn key + unlock next module only
      if (allCompleted) {
        earnKey();

        newModules.forEach((mod, i) => {
          mod.isLocked = i !== moduleIndex + 1;
        });

        if (moduleIndex + 1 < newModules.length) {
          newModules[moduleIndex + 1].isLocked = false;
        }
      }

      newModules[moduleIndex] = module;
      return newModules;
    });
  };

  const unlockModule = (moduleId: number) => {
    setModules(prevModules => {
      const newModules = [...prevModules];
      const modIndex = newModules.findIndex(m => m.id === moduleId);
      if (modIndex !== -1) newModules[modIndex].isLocked = false;
      return newModules;
    });
  };

  const resetProgress = () => {
    setModules(initialModules);
    setSelectedSchool(null);
    setKeysRemaining(3);
  };

  return (
    <AppContext.Provider value={{
      modules,
      completeItem,
      unlockModule,
      resetProgress,
      selectedSchool,
      setSelectedSchool,
      schools,
      keysRemaining,
      useKey,
      earnKey,
      isUnlocked
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

// School data
const schoolsData: School[] = [
  {
    id: "neoma",
    name: "NEOMA Business School",
    location: "Reims, Rouen, Paris",
    description: "NEOMA Business School is a French business school with campuses in Reims, Rouen, and Paris. Known for its international approach and strong alumni network.",
    campuses: ["Reims", "Rouen", "Paris"],
    costOfLiving: "€800-1,200/month",
    programsOffered: ["Master in Management", "MSc in Finance", "MSc in Marketing", "MBA", "Bachelor in Business Administration"],
    imageUrl: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg"
  },
  {
    id: "skema",
    name: "SKEMA Business School",
    location: "Lille, Paris, Sophia Antipolis, Belo Horizonte, Suzhou, Raleigh, Cape Town",
    description: "SKEMA is a global business school with campuses across three continents. It offers a multicultural learning environment with strong industry connections.",
    campuses: ["Lille", "Paris", "Sophia Antipolis", "Belo Horizonte", "Suzhou", "Raleigh", "Cape Town"],
    costOfLiving: "€850-1,300/month",
    programsOffered: ["BBA in Global Management", "Master in Management", "MSc in Financial Markets", "MSc in International Business"],
    imageUrl: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg"
  },
  {
    id: "kedge",
    name: "KEDGE Business School",
    location: "Bordeaux, Marseille, Paris, Toulon",
    description: "KEDGE is a French business school with a focus on innovation and entrepreneurship. It's known for its strong corporate connections and practical teaching approach.",
    campuses: ["Bordeaux", "Marseille", "Paris", "Toulon"],
    costOfLiving: "€750-1,100/month",
    programsOffered: ["International BBA", "MSc in Marketing", "MSc in Finance", "MBA in Global Business"],
    imageUrl: "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg"
  },
  {
    id: "audencia",
    name: "Audencia Business School",
    location: "Nantes, Paris",
    description: "Audencia is a leading European business school based in Nantes, with a strong focus on responsible management and sustainability.",
    campuses: ["Nantes", "Paris"],
    costOfLiving: "€700-1,000/month",
    programsOffered: ["Master in Management", "MSc in Supply Chain", "MBA in Chief Value Officer", "International Master in Management"],
    imageUrl: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
  },
  {
    id: "emstrasbourg",
    name: "EM Strasbourg Business School",
    location: "Strasbourg",
    description: "EM Strasbourg is the business school of the University of Strasbourg, offering programs with a strong European and international focus.",
    campuses: ["Strasbourg"],
    costOfLiving: "€750-1,050/month",
    programsOffered: ["Bachelor in European Management", "Master in Management", "MSc in International Business Development", "MBA in European Management"],
    imageUrl: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg"
  }
];






