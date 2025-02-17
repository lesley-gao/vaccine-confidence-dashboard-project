// This file handles routing for different pages.
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from "@/context/AppContextProvider.jsx";
import DashboardPage from './pages/dashboard-page/DashboardPage.jsx';
import MapPage from './pages/map-page/MapPage.jsx';
import SurveyPage from './pages/survey/SurveyPage.jsx';
import SocialMediaPage from './pages/socialmedia/SocialMediaPage.jsx';
import ProfilePage from './pages/profile-page/ProfilePage.jsx';
import HomePage from './pages/homepage/HomePage.jsx';
import NotFound from './pages/404/NotFound.jsx';
import SignupPage from './pages/signup-page/SignupPage.jsx';
import LoginPage from './pages/login-page/LoginPage.jsx';
import ForgotPassword from './pages/forget-password/ForgotPassword.jsx';
import ResetPassword from './pages/reset-password/ResetPassword.jsx';
import TermsOfServicePage from './pages/terms-page/TermsOfServicePage.jsx';
import PrivacyPolicyPage from './pages/privacy-page/PrivacyPolicyPage.jsx';
import MainLayout from './MainLayout.jsx';

function App() {

  const { user } = useAppContext();

  return (
    <Routes>
      {/* Public routes */}
      <Route index element={<HomePage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />

      {/* Routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="survey" element={<SurveyPage />} />
        <Route path="socialmedia" element={<SocialMediaPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms-of-service" element={<TermsOfServicePage />} />
        <Route path="profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;