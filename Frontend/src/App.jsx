import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.jsx';
import MapPage from './pages/MapPage.jsx';
import SurveyPage from './pages/SurveyPage.jsx';
import SocialMediaPage from './pages/SocialMediaPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MainLayout from './MainLayout.jsx';
import NotFound from './pages/NotFound.jsx';


function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/map" element={<MainLayout><MapPage /></MainLayout>} />
        <Route path="/survey" element={<MainLayout><SurveyPage /></MainLayout>} />
        <Route path="/socialmedia" element={<MainLayout><SocialMediaPage /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />

        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </>
  )
}

export default App
