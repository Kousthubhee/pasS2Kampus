export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
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