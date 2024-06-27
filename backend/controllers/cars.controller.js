import CarModel from "../models/cars.js";

// Obtener autos por marca
const getCarsByBrand = async (request, response) => {
    const brand = request.query.brand;
    if (!brand) {
        return response.status(400).send({ message: "Brand query parameter is required." });
    }
    try {
        const cars = await CarModel.find({ modelo: brand });
        if (cars.length) {
            response.status(200).send(cars);
        } else {
            response.status(404).send({ message: "No cars found for the specified brand." });
        }
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
};

// Crear un nuevo auto
const createCar = async (request, response) => {
    const { motor, modelo, descripcion, version, photo } = request.body;

    // Validación básica de datos
    if (!motor || !modelo || !descripcion || !version) {
        return response.status(400).send({ message: "Motor, modelo, descripcion, and version are required." });
    }

    const car = new CarModel({
        motor,
        modelo,
        descripcion,
        version,
        photo: photo || '' // photo es opcional
    });

    try {
        const savedCar = await car.save();
        response.status(201).send(savedCar);
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
};

export { getCarsByBrand, createCar };
