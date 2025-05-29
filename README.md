# pasS2Kampus - Your Guide to French Education

A comprehensive web application designed to help international students navigate their journey to study in France.

## Project Structure

### Core Components

- `src/App.tsx` - Main application component with routing setup
- `src/main.tsx` - Application entry point
- `src/index.css` - Global styles and Tailwind CSS configuration

### Pages

- `src/pages/checklist/ChecklistPage.tsx` - Main checklist view with all modules
  - Shows remaining keys (3 by default)
  - Modules require keys to unlock
  - Displays progress tracking for each module

- `src/pages/qa/QaPage.tsx` - Q&A interface for common student queries
  - Real-time chat-like interface
  - Common questions suggestions
  - Text-to-speech support

- `src/pages/hub/HubPage.tsx` - Community discussion platform
  - Student experiences
  - Questions for seniors
  - Resource sharing

- `src/pages/news/NewsPage.tsx` - Updates and announcements
  - Visa updates
  - University news
  - Important alerts

- `src/pages/affiliations/AffiliationsPage.tsx` - Partner services
  - Housing services
  - Banking partners
  - Transportation services

- `src/pages/language/LanguagePage.tsx` - French language learning
  - Basic phrases
  - Interactive lessons
  - Audio pronunciation

- `src/pages/translate/TranslatePage.tsx` - Translation tool
  - English to French translation
  - Voice input support
  - Common phrases

- `src/pages/contact/ContactPage.tsx` - Contact information
  - Creator details: Kousthubhee Krishna Kotte
  - Email: kousthubheekrishna@gmail.com
  - Support form

### Components

- `src/components/layout/`
  - `Header.tsx` - Navigation header with logo (redirects to main checklist)
  - `Footer.tsx` - Footer with contact links
  - `Sidebar.tsx` - Navigation sidebar with module links
  - `Layout.tsx` - Main layout wrapper

- `src/components/ui/`
  - `Button.tsx` - Reusable button component
  - `ChecklistItem.tsx` - Individual checklist item with completion toggle
  - `ModuleCard.tsx` - Module card with progress tracking
  - `SchoolCard.tsx` - School information card
  - `LessonCard.tsx` - Language lesson card

### State Management

- `src/store/`
  - `useKeysStore.ts` - Manages unlock keys (3 keys available)
  - `useModulesStore.ts` - Manages checklist modules and progress
  - `useSchoolStore.ts` - Manages school data and selection

### Types

- `src/types/`
  - `checklist.ts` - Types for checklist items and modules
  - `school.ts` - Types for school and local insights data

### Data

- `src/data/`
  - `modules/` - Individual module data
  - `schools.ts` - School information and local insights

## Navigation Flow

1. Main Entry (Logo/Title click) → Checklist Page
2. Checklist Modules:
   - School Selection → Individual School Pages with Local Insights
   - Pre-Arrival (Part 1 & 2)
   - Post-Arrival
   - University Registration
   - Documents & Renewals

3. Support Access:
   - Footer "Contact Us" → Contact Page
   - Sidebar "Contact Support" → Contact Page
   - Affiliations "Contact" → Contact Page

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technologies

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Zustand (State Management)