import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { School } from '../types/school';
import { schools } from '../data/schools';

interface SchoolStore {
  schools: School[];
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
  completeSchoolItem: (schoolId: string, itemId: string) => void;
}

export const useSchoolStore = create<SchoolStore>()(
  persist(
    (set) => ({
      schools,
      selectedSchool: null,
      setSelectedSchool: (school) => set({ selectedSchool: school }),
      completeSchoolItem: (schoolId, itemId) =>
        set((state) => {
          const newSchools = state.schools.map((school) => {
            if (school.id === schoolId) {
              return {
                ...school,
                checklist: school.checklist.map((item) =>
                  item.id === itemId
                    ? { ...item, isCompleted: !item.isCompleted }
                    : item
                ),
              };
            }
            return school;
          });

          const newSelectedSchool = state.selectedSchool?.id === schoolId
            ? newSchools.find((s) => s.id === schoolId) || null
            : state.selectedSchool;

          return {
            schools: newSchools,
            selectedSchool: newSelectedSchool,
          };
        }),
    }),
    {
      name: 'school-storage',
    }
  )
);