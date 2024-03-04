import express from "express";
import protectedRoutes from '../middleware/protectRoute.js'

import { sendMessage, getMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.post("/send/:id", protectedRoutes, sendMessage);
router.get("/:id", protectedRoutes, getMessage);
export default router;