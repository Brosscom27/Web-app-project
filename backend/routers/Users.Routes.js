import express from "express";
import * as authCtrl from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js"; 
const router = express.Router();

router.post("/iniciarSecion", authCtrl.signin);
router.post("/registrarse", authCtrl.signUp);
router.get("/profile", verifyToken, authCtrl.getProfile); 
router.put('/profile/photo', verifyToken, authCtrl.updateProfilePhoto);
router.put('/profile/password', verifyToken, authCtrl.updatePassword); 
router.delete('/profile', verifyToken, authCtrl.deleteUser);

export default router;
