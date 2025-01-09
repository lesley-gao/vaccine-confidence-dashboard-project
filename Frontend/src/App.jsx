import { Routes, Route } from 'react-router-dom';
import DashboardPage from  './pages/dashboard-page/DashboardPage.jsx';
import MapPage from './pages/map-page/MapPage.jsx';
import SurveyPage from './pages/survey/SurveyPage.jsx';
import SocialMediaPage from './pages/socialmedia/SocialMediaPage.jsx';
import ProfilePage from './pages/profile-page/ProfilePage.jsx';
import HomePage from './pages/homepage/HomePage.jsx';
import MainLayout from './MainLayout.jsx';
import NotFound from './pages/404/NotFound.jsx';
import SignupPage from './pages/signup-page/SignupPage.jsx';
import LoginPage from './pages/login-page/LoginPage.jsx';

function App() {
  return (
    <>
      <Routes>
        {/* Home route */}
        <Route index element={<HomePage />} />

        {/* Main layout with nested routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="survey" element={<SurveyPage />} />
          <Route path="socialmedia" element={<SocialMediaPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
