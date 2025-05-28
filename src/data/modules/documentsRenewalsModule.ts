import { ChecklistModule } from '../../types/checklist';

export const documentsRenewalsModule: ChecklistModule = {
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
};