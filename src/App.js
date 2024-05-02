import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CustomNavbar from './layouts/Navbar';
import Register from './pages/Register';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import CustomFooter from './layouts/Footer';
import Home from './pages/Home';
import { AuthProvider } from './context/authContext/AuthContext';
import { AlertProvider } from './context/alertContext/AlertContext';
import { ProfileProvider } from './context/profileContext/ProfileContext';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProtectedRoute from './components/shared/ProtectedRoute';
import PublicRoute from './components/shared/PublicRoute';
import Ads from './components/ads/Ads';
import { AdProvider } from './context/adContext/AdContext';
import { StatsProvider } from './context/statsContext/StatsContext';
import Stats from './pages/Stats';


function App() {
  return (
    <AlertProvider>
      <AdProvider>
        <StatsProvider>
          <ProfileProvider>
            <AuthProvider>
              <Router>
                <CustomNavbar/>
                <Routes>
                  <Route element={<PublicRoute/>}>
                    <Route exact path='/auth/register' element={<Register />} />
                    <Route exact path='/auth/login' element={<Login />} />
                    <Route exact path='/auth/forgot-password' element={<ForgotPassword />} />
                  </Route>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/home' element={<Home />} />
                  <Route element={<ProtectedRoute/>}>
                    <Route exact path='/profile/:id' element={<Profile />} />
                    <Route exact path='/ads' element={<Ads />} />
                    <Route exact path='/stats' element={<Stats />} />
                  </Route>      
                  <Route path='/*' element={<NotFound />} />
                </Routes>
                <CustomFooter/>
              </Router>
            </AuthProvider>
          </ProfileProvider>
        </StatsProvider>
      </AdProvider>
    </AlertProvider>
  );
}

export default App;
