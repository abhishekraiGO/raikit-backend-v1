import express from "express";
import protectedRoutes from '../middleware/protectRoute.js'
import { sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.post("/send/:id", protectedRoutes, sendMessage);
export default router;