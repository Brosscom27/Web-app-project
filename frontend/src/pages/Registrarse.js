import React, { useState } from 'react';
import '../styles/Registrarse.css';
import { useNavigate } from 'react-router-dom';

function Registrarse() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginRedirect = () => {
    navigate('/iniciarSesion');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/Users/registrarse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: nombre, email, password }),
    });
    const data = await response.text();
    console.log(data);
    if (response.ok) {
      handleLoginRedirect();
    } else {
      alert('Error en el registro: ' + data);
    }
  };

  return (
    <div className="Registrarse-container">
      <div className="form-wrapper">
        <h2>Registrarse</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required 
              onChange={e => setNombre(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" name="email" required 
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required 
              onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn">Confirmar</button>
          <button type="button" className="btn secondary" onClick={handleLoginRedirect}>Ya estoy registrado</button>
        </form>
      </div>
    </div>
  );
}

export default Registrarse;
