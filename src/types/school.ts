import { ChecklistItem } from './checklist';

export interface LocalInsight {
  id: string;
  title: string;
  description: string;
  category: 'housing' | 'food' | 'transport' | 'activities' | 'tips';
  icon: string;
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
  checklist: ChecklistItem[];
  localInsights: LocalInsight[];
}