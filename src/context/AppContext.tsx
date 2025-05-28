import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Define our module types
export interface ChecklistModule {
  id: number;
  title: string;
  icon: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
  details?: string;
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

// Context type
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
}

// Default context
const defaultContext: AppContextType = {
  modules: [],
  completeItem: () => {},
  unlockModule: () => {},
  resetProgress: () => {},
  selectedSchool: null,
  setSelectedSchool: () => {},
  schools: [],
  keysRemaining: 3,
  useKey: () => {},
};

// Create context
const AppContext = createContext<AppContextType>(defaultContext);

// Initial modules data
const initialModules: ChecklistModule[] = [
  {
    id: 1,
    title: "School",
    icon: "🏫",
    description: "Explore French business schools and their offerings",
    isCompleted: false,
    isLocked: false,
    items: [
      { id: "1-1", text: "Research programs", isCompleted: false },
      { id: "1-2", text: "Compare costs", isCompleted: false },
      { id: "1-3", text: "Check admission criteria", isCompleted: false },
      { id: "1-4", text: "Explore campus locations", isCompleted: false },
    ],
  },
  {
    id: 2,
    title: "Pre-Arrival Checklist (Part 1)",
    icon: "✈️",
    description: "Essential steps before departure",
    isCompleted: false,
    isLocked: true,
    items: [
      { id: "2-1", text: "Complete Campus France application", isCompleted: false, details: "Step-by-step guide for Campus France process" },
      { id: "2-2", text: "Schedule VFS visa appointment", isCompleted: false, details: "Documents needed for visa application" },
      { id: "2-3", text: "Book flights", isCompleted: false, details: "Tips for finding student discounts" },
      { id: "2-4", text: "Organize essential documents", isCompleted: false, details: "Checklist of required paperwork" },
    ],
  },
  {
    id: 3,
    title: "Pre-Arrival Checklist (Part 2)",
    icon: "🧳",
    description: "Preparing for your journey",
    isCompleted: false,
    isLocked: true,
    items: [
      { id: "3-1", text: "Pack essential food items", isCompleted: false },
      { id: "3-2", text: "Prepare weather-appropriate clothing", isCompleted: false },
      { id: "3-3", text: "Complete packing checklist", isCompleted: false },
      { id: "3-4", text: "Exchange currency", isCompleted: false },
    ],
  },
  {
    id: 4,
    title: "Post-Arrival Checklist",
    icon: "🏠",
    description: "First steps in France",
    isCompleted: false,
    isLocked: true,
    items: [
      { id: "4-1", text: "Open a French bank account", isCompleted: false },
      { id: "4-2", text: "Apply for social security number", isCompleted: false },
      { id: "4-3", text: "Submit CAF housing aid application", isCompleted: false },
      { id: "4-4", text: "Obtain Carte Vitale", isCompleted: false },
      { id: "4-5", text: "Schedule required medical appointments", isCompleted: false },
     
    ],
  },
  {
    id: 5,
    title: "Local Insights",
    icon: "🔍",
    description: "Navigating your new home",
    isCompleted: false,
    isLocked: true,
    items: [
      { id: "5-1", text: "Locate Indian grocery stores", isCompleted: false },
      { id: "5-2", text: "Compare mobile plans", isCompleted: false },
      { id: "5-3", text: "Join student communities", isCompleted: false },
      { id: "5-4", text: "Save emergency contacts", isCompleted: false },
      { id: "5-5", text: "Learn local cultural norms", isCompleted: false },
    ],
  },
  {
    id: 6,
    title: "University Registration & Orientation",
    icon: "🎓",
    description: "Starting your academic journey",
    isCompleted: false,
    isLocked: true,
    items: [
      { id: "6-1", text: "Complete enrollment process", isCompleted: false },
      { id: "6-2", text: "Obtain student insurance", isCompleted: false },
      { id: "6-3", text: "Activate student card", isCompleted: false },
      { id: "6-4", text: "Attend orientation sessions", isCompleted: false },
    ],
  },
  {
    id: 7,
    title: "Documents & Renewals",
    icon: "📝",
    description: "Maintaining your legal status",
    isCompleted: false,
    isLocked: true,
    items: [
      { id: "7-1", text: "Validate visa online", isCompleted: false },
      { id: "7-2", text: "Complete OFII procedure", isCompleted: false },
      { id: "7-3", text: "Update student insurance", isCompleted: false },
      { id: "7-4", text: "Set renewal reminders", isCompleted: false },
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

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Load saved progress from localStorage
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

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('checklist-modules', JSON.stringify(modules));
    localStorage.setItem('keys-remaining', keysRemaining.toString());
  }, [modules, keysRemaining]);

  // Mark a checklist item as complete
  const completeItem = (moduleId: number, itemId: string) => {
    setModules(prevModules => {
      const newModules = [...prevModules];
      const moduleIndex = newModules.findIndex(m => m.id === moduleId);
      
      if (moduleIndex === -1) return prevModules;
      
      const module = {...newModules[moduleIndex]};
      const itemIndex = module.items.findIndex(i => i.id === itemId);
      
      if (itemIndex === -1) return prevModules;
      
      // Toggle the completed state
      const newItems = [...module.items];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        isCompleted: !newItems[itemIndex].isCompleted
      };
      
      module.items = newItems;
      
      // Check if all items are completed
      const allCompleted = newItems.every(item => item.isCompleted);
      module.isCompleted = allCompleted;
      
      // Unlock next module if this one is completed
      if (allCompleted && moduleIndex < newModules.length - 1) {
        newModules[moduleIndex + 1] = {
          ...newModules[moduleIndex + 1],
          isLocked: false
        };
      }
      
      newModules[moduleIndex] = module;
      return newModules;
    });
  };

  // Use a key to unlock a module
  const useKey = (moduleId: number) => {
    if (keysRemaining > 0) {
      setKeysRemaining(prev => prev - 1);
      setModules(prevModules => {
        const newModules = [...prevModules];
        const moduleIndex = newModules.findIndex(m => m.id === moduleId);
        
        if (moduleIndex === -1) return prevModules;
        
        newModules[moduleIndex] = {
          ...newModules[moduleIndex],
          isLocked: false
        };
        
        return newModules;
      });
    }
  };

  // Manually unlock a module
  const unlockModule = (moduleId: number) => {
    setModules(prevModules => {
      const newModules = [...prevModules];
      const moduleIndex = newModules.findIndex(m => m.id === moduleId);
      
      if (moduleIndex === -1) return prevModules;
      
      newModules[moduleIndex] = {
        ...newModules[moduleIndex],
        isLocked: false
      };
      
      return newModules;
    });
  };

  // Reset all progress
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
      useKey
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);