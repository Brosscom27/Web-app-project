import UserModel from "../models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import { Client, ID, Storage } from 'appwrite'; // Asegúrate de importar ID desde Appwrite

dotenv.config();

// Configura el cliente de Appwrite
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Tu endpoint de Appwrite
    .setProject('667d063f002ac3c7d928'); // Tu ID de proyecto

const storage = new Storage(client);

// Obtén el directorio actual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const signUp = async (req, res) => {
    const { user, password, email } = req.body;
    const photo = req.body.photo || 'https://cloud.appwrite.io/v1/storage/buckets/667d06be00136d314152/files/667d2a3100194735e6ee/view?project=667d063f002ac3c7d928&mode=admin';
    try {
        const usernew = new UserModel({
            user,
            password: await UserModel.encrypt(password),
            email,
            photo
        });

        const usersave = await usernew.save();

        const token = jwt.sign({ id: usersave._id }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const signin = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: "Usuario no registrado" });
        }

        const match = await UserModel.compare(req.body.password, user.password);

        if (!match) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId, { password: 0 }); // Excluir el campo de contraseña
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const updateProfilePhoto = async (req, res) => {
    try {
        console.log("Entrando a updateProfilePhoto"); // Agregado para depuración

        // Verifica si hay archivos en la solicitud
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No files were uploaded." });
        }

        // Obtén el archivo de la solicitud
        const file = req.files.photo; // Asegúrate de que el cliente envíe el archivo en el campo 'photo'
        console.log("Archivo recibido:", file.name); // Agregado para depuración

        // Define el path para guardar el archivo temporalmente
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
        const tempPath = path.join(tempDir, file.name);

        // Mueve el archivo a una ubicación temporal
        await file.mv(tempPath);
        console.log("Archivo movido a:", tempPath); // Agregado para depuración

        // Crear un FormData para enviar el archivo a Appwrite
        const formData = new FormData();
        formData.append('fileId', ID.unique());
        formData.append('file', fs.createReadStream(tempPath));

        // Configuración de la solicitud de axios
        const config = {
            method: 'post',
            url: `https://cloud.appwrite.io/v1/storage/buckets/667d06be00136d314152/files`,
            headers: {
                ...formData.getHeaders(),
                'X-Appwrite-Project': '667d063f002ac3c7d928',
                'X-Appwrite-Key': process.env.APPWRITE_API_KEY, // Agrega tu clave API de Appwrite aquí
            },
            data: formData,
        };

        // Enviar la solicitud a Appwrite
        const response = await axios(config);
        console.log("Respuesta de Appwrite:", response.data); // Agregado para depuración

        // Construir la URL con los parámetros adicionales
        const fileId = response.data.$id;
        const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/667d06be00136d314152/files/${fileId}/view?project=667d063f002ac3c7d928&mode=admin`;

        // Actualizar el enlace de la foto en MongoDB
        const user = await UserModel.findByIdAndUpdate(req.userId, { photo: fileUrl }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile photo updated successfully", photo: fileUrl });
    } catch (error) {
        console.error("Error en Appwrite:", error); // Agregado para depuración
        res.status(500).json({ message: "Error al subir el archivo a Appwrite", error: error.message });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const match = await UserModel.compare(oldPassword, user.password);
        if (!match) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        user.password = await UserModel.encrypt(newPassword);
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
