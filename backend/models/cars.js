import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    motor: {
        type: String,
        required: true,
    },
    modelo: { type: String },
    descripcion: { type: String },
    version: { type: String },
    photo: {
        type: String,
        required: false
    }
});

const CarModel = mongoose.model("cars", CarSchema);
export default CarModel;