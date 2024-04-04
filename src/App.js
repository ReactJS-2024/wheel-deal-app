import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CustomNavbar from './layouts/Navbar';
import Register from './pages/Register';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { AuthProvider } from './context/authContext/AuthContext';
import CustomFooter from './layouts/Footer';
import Home from './pages/Home';
import { AlertProvider } from './context/alertContext/AlertContext';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <Router>
          <CustomNavbar/>
          <Routes>
            <Route exact path='/auth/register' element={<Register />} />
            <Route exact path='/auth/login' element={<Login />} />
            <Route exact path='/auth/forgot-password' element={<ForgotPassword />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/home' element={<Home />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
          <CustomFooter/>
        </Router>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
