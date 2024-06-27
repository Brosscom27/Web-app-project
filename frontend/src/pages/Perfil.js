import React, { useEffect, useState } from 'react';
import '../styles/Perfil.css'; // Asegúrate de que este archivo CSS contenga los estilos mejorados
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa'; // Importa el ícono de lápiz de react-icons

function Perfil() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false); // Estado para controlar la visibilidad del formulario de contraseña
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); // Redirige al usuario a la página de inicio u otra página
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/Users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    console.log("Archivo seleccionado:", e.target.files[0]); // Agregado para depuración
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', photo);

    try {
      const response = await fetch('http://localhost:5000/Users/profile/photo', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setUser((prevUser) => ({ ...prevUser, photo: data.photo })); // Actualiza la URL de la foto de perfil en la interfaz de usuario
        console.log("Foto actualizada correctamente:", data.photo); // Agregado para depuración
      } else {
        console.error('Failed to upload photo');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/Users/profile/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      if (response.ok) {
        console.log("Contraseña actualizada correctamente");
        setOldPassword('');
        setNewPassword('');
        setShowPasswordForm(false); // Oculta el formulario después de actualizar la contraseña
      } else {
        console.error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/Users/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        console.log("Usuario eliminado correctamente");
        localStorage.removeItem('token'); // Eliminar el token
        navigate('/', { replace: true }); // Redirige al usuario a la página de inicio de sesión
        window.history.replaceState(null, '', '/login'); // Previene el regreso a la página anterior
        setTimeout(() => {
          window.location.reload(); // Recarga la página para asegurarse de que el estado se actualice correctamente
        }, 100); // Añadir un pequeño retraso para asegurar la recarga
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="perfil-container">
      <button className="close-button" onClick={handleClose}>✖</button>
      <div className="perfil-header">
        <div className="perfil-photo-container">
          <img src={user.photo} alt="Foto de perfil" className="perfil-photo" />
          <label htmlFor="file-input" className="edit-photo-icon">
            <FaPen />
          </label>
          <input 
            id="file-input" 
            type="file" 
            style={{ display: 'none' }} 
            onChange={handlePhotoChange} 
          />
        </div>
        <h2 className="perfil-username">{user.user}</h2>
        <p className="perfil-email">{user.email}</p>
      </div>
      {photo && (
        <form onSubmit={handlePhotoUpload} className="photo-upload-form">
          <button type="submit">Actualizar Foto</button>
        </form>
      )}
      <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="toggle-password-form-button">
        {showPasswordForm ? "Cancelar" : "Actualizar Contraseña"}
      </button>
      {showPasswordForm && (
        <form onSubmit={handlePasswordUpdate} className="password-update-form">
          <input
            type="password"
            placeholder="Contraseña antigua"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Actualizar Contraseña</button>
        </form>
      )}
      <button onClick={handleDeleteUser} className="delete-user-button">
        Eliminar Usuario
      </button>
    </div>
  );
}

export default Perfil;
