// En tu componente principal (App.js por ejemplo)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
// Importa los componentes de cada marca
import Porsche from './components/Porsche';
import IniciarSesion from './pages/IniciarSesion';
import Ferrari from './components/Ferrari';
import Nissan from './components/Nissan';
import Toyota from './components/Toyota';
import Subaru from './components/Subaru';
import Registrarse from './pages/Registrarse';
import Comunidad from './pages/Comunidad';
import Perfil from './pages/Perfil'; // Importa el componente de perfil
import userImage from '../src/images/usu.png'; // Importa la imagen de usuario
import ProtectedRoute from './components/ProtectedRoute'; // Importa el componente ProtectedRoute

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false); // Estado para el menú de usuario
  const [isAuthenticated, setAuthenticated] = useState(false); // Estado de autenticación

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false); // Cierra el menú de usuario
  };

  const handleLogout = () => {
    setAuthenticated(false); // Actualiza el estado de autenticación
    localStorage.removeItem('token'); // Elimina el token del localStorage
    closeUserMenu();
  };

  const MenuLink = ({ to, children, closeMenu }) => {
    const navigate = useNavigate();
    const handleClick = () => {
      if (closeMenu) {
        closeMenu(); // Llama a la función para cerrar el menú
      }
      navigate(to);
    };
  
    return <p onClick={handleClick}>{children}</p>;
  };

  return (
    <Router>
      <div className="App">
        <div className="user-icon" onClick={toggleUserMenu}>
          <img src={userImage} alt="User Icon" />
        </div>
        <div className={`user-menu ${isUserMenuOpen ? 'open' : ''}`}>
          {!isAuthenticated ? (
            <>
              <Link to="/iniciarSesion" onClick={closeUserMenu}>Iniciar sesión</Link>
              <Link to="/registrarse" onClick={closeUserMenu}>Registrarse</Link>
            </>
          ) : (
            <>
              <Link to="/perfil" onClick={closeUserMenu}>Perfil</Link>
              <Link to="/" onClick={handleLogout}>Cerrar sesión</Link>
            </>
          )}
        </div>
        <button onClick={toggleMenu} className="botonmenu">☰</button>
        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <button onClick={toggleMenu} className="close-button">✖</button>
          <MenuLink to="/" closeMenu={toggleMenu}>Inicio</MenuLink>
          <MenuLink to="/porsche" closeMenu={toggleMenu}>Porsche</MenuLink>
          <MenuLink to="/ferrari" closeMenu={toggleMenu}>Ferrari</MenuLink>
          <MenuLink to="/nissan" closeMenu={toggleMenu}>Nissan</MenuLink>
          <MenuLink to="/toyota" closeMenu={toggleMenu}>Audi</MenuLink>
          <MenuLink to="/subaru" closeMenu={toggleMenu}>BMW</MenuLink>
          <MenuLink to="/comunidad" closeMenu={toggleMenu}>Comunidad</MenuLink>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/porsche" element={<Porsche />} />
          <Route path="/iniciarSesion" element={<IniciarSesion setAuthenticated={setAuthenticated} />} />
          <Route path="/ferrari" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Ferrari /></ProtectedRoute>} />
          <Route path="/nissan" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Nissan /></ProtectedRoute>} />
          <Route path="/toyota" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Toyota /></ProtectedRoute>} />
          <Route path="/subaru" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Subaru /></ProtectedRoute>} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/comunidad" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Comunidad /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Perfil /></ProtectedRoute>} /> {/* Ruta para el perfil */}
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
}

export default App;
