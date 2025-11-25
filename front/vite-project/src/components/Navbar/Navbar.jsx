import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/cruznTattoStudio.png";
import { isUserLoggedIn, getUserName, logoutUser } from "../../helpers/authHelpers";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    const checkAuthStatus = () => {
      const loggedIn = isUserLoggedIn();
      const name = getUserName();
      setUserLoggedIn(loggedIn);
      setUserName(name || '');
    };
    
    checkAuthStatus();
    
    
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChanged', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUserLoggedIn(false);
    setUserName('');
    closeMenu();
    navigate('/');
    
    window.dispatchEvent(new Event('authStateChanged'));
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  const handleScrollNavigation = (sectionId) => {
    closeMenu();
    
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="navbar__icons">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="icon-link"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} className="icon" />
          </a>
          <a 
            href="https://www.instagram.com/diego_marzioni/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="icon-link"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} className="icon" />
          </a>
          <a 
            href="https://www.linkedin.com/in/diego-marzioni/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="icon-link"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
          </a>

          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className={`navbar__overlay ${menuOpen ? "show" : ""}`}>
          <ul className="overlay__menu">
            <li>
              <Link to="/" onClick={closeMenu}>Inicio</Link>
            </li>
            <li>
              <Link to="/mis-turnos" onClick={closeMenu}>Mis Turnos</Link>
            </li>
            {userLoggedIn && (
              <li>
                <Link to="/crear-turno" onClick={closeMenu}>Crear Turno</Link>
              </li>
            )}
            {userLoggedIn && (
              <li>
                <Link to="/perfil" onClick={closeMenu}>Mi Perfil</Link>
              </li>
            )}
            <li>
              <button onClick={() => handleScrollNavigation('el-estudio')} className="nav-button">
                El Estudio
              </button>
            </li>
            <li>
              <Link to="/galeria-tatuajes" onClick={closeMenu}>Trabajos</Link>
            </li>
            <li>
              <Link to="/equipo" onClick={closeMenu}>Empleados</Link>
            </li>
            <li>
              <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
            </li>
            {userLoggedIn ? (
              <>
                <li>
                  <span className="nav-user-greeting">¡Hola, {userName}!</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="nav-button logout-button">
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={closeMenu}>Iniciar Sesión</Link>
                </li>
                <li>
                  <Link to="/register" onClick={closeMenu}>Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
