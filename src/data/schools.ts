import { School } from '../types/school';

export const schools: School[] = [
  {
    id: "neoma",
    name: "NEOMA Business School",
    location: "Reims, Rouen, Paris",
    description: "NEOMA Business School is a French business school with campuses in Reims, Rouen, and Paris. Known for its international approach and strong alumni network.",
    campuses: ["Reims", "Rouen", "Paris"],
    costOfLiving: "€800-1,200/month",
    programsOffered: ["Master in Management", "MSc in Finance", "MSc in Marketing", "MBA", "Bachelor in Business Administration"],
    imageUrl: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg",
    checklist: [
      { id: "neoma-1", text: "Submit application documents", isCompleted: false },
      { id: "neoma-2", text: "Complete online interview", isCompleted: false },
      { id: "neoma-3", text: "Pay registration fees", isCompleted: false },
      { id: "neoma-4", text: "Submit housing application", isCompleted: false }
    ],
    localInsights: [
      {
        id: "neoma-rouen-1",
        title: "Housing in Rouen",
        description: "CROUS residences near campus offer affordable options. The Mont-Saint-Aignan area is popular among students.",
        category: "housing",
        icon: "🏠"
      },
      {
        id: "neoma-rouen-2",
        title: "Indian Groceries",
        description: "Visit 'Épicerie du Monde' near Saint-Sever for Indian groceries and spices.",
        category: "food",
        icon: "🛒"
      },
      {
        id: "neoma-rouen-3",
        title: "Transportation",
        description: "Get the Astuce transport card for buses and metro. Monthly student pass costs around €30.",
        category: "transport",
        icon: "🚇"
      }
    ]
  },
  {
    id: "kedge",
    name: "KEDGE Business School",
    location: "Bordeaux, Marseille, Paris, Toulon",
    description: "KEDGE is a French business school with a focus on innovation and entrepreneurship. It's known for its strong corporate connections and practical teaching approach.",
    campuses: ["Bordeaux", "Marseille", "Paris", "Toulon"],
    costOfLiving: "€750-1,100/month",
    programsOffered: ["International BBA", "MSc in Marketing", "MSc in Finance", "MBA in Global Business"],
    imageUrl: "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg",
    checklist: [
      { id: "kedge-1", text: "Complete online application", isCompleted: false },
      { id: "kedge-2", text: "Submit GMAT/GRE scores", isCompleted: false },
      { id: "kedge-3", text: "Schedule admission interview", isCompleted: false },
      { id: "kedge-4", text: "Submit proof of English proficiency", isCompleted: false }
    ],
    localInsights: [
      {
        id: "kedge-bordeaux-1",
        title: "Student Housing",
        description: "Check 'Les Estudines' or 'Studéa' residences near the Bordeaux campus.",
        category: "housing",
        icon: "🏠"
      },
      {
        id: "kedge-bordeaux-2",
        title: "Local Transportation",
        description: "TBM transport network offers student discounts. Annual pass costs around €200.",
        category: "transport",
        icon: "🚌"
      },
      {
        id: "kedge-bordeaux-3",
        title: "Indian Restaurants",
        description: "Try 'Royal Bombay' or 'Krishna Bhavan' for authentic Indian food.",
        category: "food",
        icon: "🍛"
      }
    ]
  }
];