import express from "express";
import { getCarsByBrand, createCar } from "../controllers/cars.controller.js";
const router = express.Router();

router.get("/car", getCarsByBrand);
router.post("/car", createCar);

export default router;
