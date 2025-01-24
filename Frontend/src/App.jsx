import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/dashboard-page/DashboardPage.jsx';
import MapPage from './pages/map-page/MapPage.jsx';
import SurveyPage from './pages/survey/SurveyPage.jsx';
import SocialMediaPage from './pages/socialmedia/SocialMediaPage.jsx';
import ProfilePage from './pages/profile-page/ProfilePage.jsx';
import HomePage from './pages/homepage/HomePage.jsx';
import MainLayout from './MainLayout.jsx';
import NotFound from './pages/404/NotFound.jsx';
import SignupPage from './pages/signup-page/SignupPage.jsx';
import LoginPage from './pages/login-page/LoginPage.jsx';
import ForgotPassword from './pages/forget-password/ForgotPassword.jsx';
import ResetPassword from './pages/reset-password/ResetPassword.jsx';
import { useAppContext } from "@/context/AppContextProvider.jsx";
 

function App() {

  const { user } = useAppContext();

  //   useEffect(() => {
  //     console.log('App rendered, user:', user);
  // }, [user]);

  return (
    <Routes>
      {/* Home route */}
      <Route index element={<HomePage />} />

      {/* Main layout routes*/}
      <Route path="dashboard" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path="map" element={<MainLayout />}>
        <Route index element={<MapPage />} />
      </Route>
      <Route path="survey" element={<MainLayout />}>
        <Route index element={<SurveyPage />} />
      </Route>
      <Route path="socialmedia" element={<MainLayout />}>
        <Route index element={<SocialMediaPage />} />
      </Route>
      <Route path="profile" element={<MainLayout />}>
        <Route index element={user ? <ProfilePage /> : <Navigate to="/login" />} />
      </Route>

      {/* Auth routes */}
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;