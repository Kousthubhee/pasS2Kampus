import { ChecklistModule } from '../../types/checklist';

export const schoolModule: ChecklistModule = {
  id: 1,
  title: "School",
  icon: "🏫",
  description: "Explore French business schools and their offerings",
  isCompleted: false,
  isLocked: false,
  items: [
     {
    id: "neoma",
    name: "NEOMA Business School",
    location: "Reims, Rouen, Paris",
    description: "NEOMA Business School is a French business school with campuses in Reims, Rouen, and Paris. Known for its international approach and strong alumni network.",
    campuses: ["Reims", "Rouen", "Paris"],
    costOfLiving: "€800-1,200/month",
    programsOffered: ["Master in Management", "MSc in Finance", "MSc in Marketing", "MBA", "Bachelor in Business Administration"],
    imageUrl: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg"
  },
  {
    id: "skema",
    name: "SKEMA Business School",
    location: "Lille, Paris, Sophia Antipolis, Belo Horizonte, Suzhou, Raleigh, Cape Town",
    description: "SKEMA is a global business school with campuses across three continents. It offers a multicultural learning environment with strong industry connections.",
    campuses: ["Lille", "Paris", "Sophia Antipolis", "Belo Horizonte", "Suzhou", "Raleigh", "Cape Town"],
    costOfLiving: "€850-1,300/month",
    programsOffered: ["BBA in Global Management", "Master in Management", "MSc in Financial Markets", "MSc in International Business"],
    imageUrl: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg"
  },
  {
    id: "kedge",
    name: "KEDGE Business School",
    location: "Bordeaux, Marseille, Paris, Toulon",
    description: "KEDGE is a French business school with a focus on innovation and entrepreneurship. It's known for its strong corporate connections and practical teaching approach.",
    campuses: ["Bordeaux", "Marseille", "Paris", "Toulon"],
    costOfLiving: "€750-1,100/month",
    programsOffered: ["International BBA", "MSc in Marketing", "MSc in Finance", "MBA in Global Business"],
    imageUrl: "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg"
  },
  {
    id: "audencia",
    name: "Audencia Business School",
    location: "Nantes, Paris",
    description: "Audencia is a leading European business school based in Nantes, with a strong focus on responsible management and sustainability.",
    campuses: ["Nantes", "Paris"],
    costOfLiving: "€700-1,000/month",
    programsOffered: ["Master in Management", "MSc in Supply Chain", "MBA in Chief Value Officer", "International Master in Management"],
    imageUrl: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
  },
  {
    id: "emstrasbourg",
    name: "EM Strasbourg Business School",
    location: "Strasbourg",
    description: "EM Strasbourg is the business school of the University of Strasbourg, offering programs with a strong European and international focus.",
    campuses: ["Strasbourg"],
    costOfLiving: "€750-1,050/month",
    programsOffered: ["Bachelor in European Management", "Master in Management", "MSc in International Business Development", "MBA in European Management"],
    imageUrl: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg"
  }
  ],
};