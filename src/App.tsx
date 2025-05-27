import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ChecklistPage from './pages/checklist/ChecklistPage';
import QaPage from './pages/qa/QaPage';
import HubPage from './pages/hub/HubPage';
import NewsPage from './pages/news/NewsPage';
import AffiliationsPage from './pages/affiliations/AffiliationsPage';
import LanguagePage from './pages/language/LanguagePage';
import TranslatePage from './pages/translate/TranslatePage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import ProfilePage from './pages/profile/ProfilePage';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ChecklistPage />} />
            <Route path="/qa" element={<QaPage />} />
            <Route path="/hub" element={<HubPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/affiliations" element={<AffiliationsPage />} />
            <Route path="/language" element={<LanguagePage />} />
            <Route path="/translate" element={<TranslatePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App