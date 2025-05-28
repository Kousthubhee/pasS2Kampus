import { ChecklistModule } from '../../types/checklist';

export const preArrivalPart2Module: ChecklistModule = {
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
};