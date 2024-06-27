import React, { useEffect, useState } from 'react';
import '../styles/Porsche.css';

function Porsche() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/Cars/car?brand=Porsche');
            const data = await response.json();
            setCars(data);
        };
        fetchData();
    }, []);

    return (
        <div className="porsche-container">
            {/* Encabezado de la página */}
            <div className="porsche-header">
                <h1 className="porsche-title">REVZOOM</h1>
                <h2 className="porsche-subtitle">PORSCHE</h2>
            </div>
            {/* Listado de coches Porsche */}
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

export default Porsche;
