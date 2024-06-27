import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/IniciarSesion.css';

function IniciarSesion({ setAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/Users/iniciarSecion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem('token', data.token); // Guarda el token en el almacenamiento local
      setAuthenticated(true); // Actualiza el estado de autenticación
      navigate('/');
    } else {
      setError('Inicio de sesión fallido. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <div className="IniciarSesion-container">
      <div className="form-wrapper">
        <h2>Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default IniciarSesion;
