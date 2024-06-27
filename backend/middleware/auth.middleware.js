import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/users.js";

dotenv.config();

export const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Asumiendo que el token viene en el formato "Bearer <token>"
        req.userId = decoded.id;
        const user = await UserModel.findById(req.userId, { password: 0 }); // Excluir el campo de contraseña
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
