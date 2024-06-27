import React, { useEffect, useState } from 'react';
import '../styles/Subaru.css';

function Subaru() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/Cars/car?brand=BMW');
            const data = await response.json();
            setCars(data);
        };
        fetchData();
    }, []);

    return (
        <div className="subaru-container">
            <div className="subaru-header">
                <h1 className="subaru-title">REVZOOM</h1>
                <h2 className="subaru-subtitle">BMW</h2>
            </div>
            <div className="cars-grid">
                {cars.map(car => (
                    <div key={car._id} className="car-box">
                        <img src={car.photo} alt={car.modelo} className="car-image" /> {/* Añadir la imagen del auto */}
                        <h2 className="car-title">{car.modelo} - {car.version}</h2>
                        <p className="car-details">Descripción: {car.descripcion}</p>
                        <p className="car-details">Motor: {car.motor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subaru;
