import { ChecklistModule } from '../../types/checklist';

export const preArrivalPart1Module: ChecklistModule = {
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
};