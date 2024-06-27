import React, { useEffect, useState } from 'react';
import '../styles/Ferrari.css';

function Ferrari() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/Cars/car?brand=Ferrari');
            const data = await response.json();
            setCars(data);
        };
        fetchData();
    }, []);

    return (
        <div className="ferrari-container">
            <div className="ferrari-header">
                <h1 className="ferrari-title">REVZOOM</h1>
                <h2 className="ferrari-subtitle">FERRARI</h2>
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

export default Ferrari;
