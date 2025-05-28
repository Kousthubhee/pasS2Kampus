import { ChecklistModule } from '../../types/checklist';

export const postArrivalModule: ChecklistModule = {
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
    { id: "4-6", text: "Get transportation card", isCompleted: false },
  ],
};