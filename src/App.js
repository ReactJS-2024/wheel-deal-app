import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CustomNavbar from './layouts/Navbar';
import Register from './pages/Register';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { AuthProvider } from './context/authContext/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomNavbar/>

        <Routes>
          <Route exact path='/auth/register' element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
