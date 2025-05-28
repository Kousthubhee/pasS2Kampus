import { ChecklistModule } from '../../types/checklist';

export const schoolModule: ChecklistModule = {
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
};