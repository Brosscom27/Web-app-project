import express from "express";
import fileUpload from 'express-fileupload';
import dotenv from "dotenv";
import cors from "cors";
import DB from "./backend/config/db.js";
import CarRoutes from "./backend/routers/Cars.Routes.js";
import UserRoutes from "./backend/routers/Users.Routes.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 3000

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/Cars", CarRoutes);
app.use("/Users", UserRoutes);

DB.connectDB(process.env.DB_URI);

app.listen(port, ()=>{
    console.log(`Server conect at http://localhost:${port}`);
});