import { ChecklistModule } from '../../types/checklist';

export const universityRegistrationModule: ChecklistModule = {
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
};