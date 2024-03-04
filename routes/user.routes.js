import express from 'express';
import protectedRoutes from '../middleware/protectRoute.js';
import getUsers from '../controllers/user.controller.js'
const router = new express.Router();

router.use('/', protectedRoutes, getUsers);
export default router;