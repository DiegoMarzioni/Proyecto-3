import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import Home from './views/Home/Home';
import MisTurnos from './views/MisTurnos/MisTurnos';
import CrearTurno from './views/CrearTurno/CrearTurno';
import Perfil from './views/Perfil/Perfil';
import GaleriaTatuajes from './views/GaleriaTatuajes/GaleriaTatuajes';
import Equipo from './views/Equipo/Equipo';
import ContactSection from './views/ContactSection/ContactSection';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import NotFound from './views/NotFound/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <WhatsAppButton />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria-tatuajes" element={<GaleriaTatuajes />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/contacto" element={<ContactSection />} />
          
          
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          
          
          <Route 
            path="/mis-turnos" 
            element={
              <ProtectedRoute>
                <MisTurnos />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/crear-turno" 
            element={
              <ProtectedRoute>
                <CrearTurno />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } 
          />
          
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
