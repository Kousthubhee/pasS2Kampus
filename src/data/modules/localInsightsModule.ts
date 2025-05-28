import { ChecklistModule } from '../../types/checklist';

export const localInsightsModule: ChecklistModule = {
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
};