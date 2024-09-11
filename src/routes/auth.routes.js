import { Router } from "express";
import { authUser } from "../controllers/auth.user.controller.js";
import { infoUser, verifyToken } from "../middleware/verifyToken.js";

const router = Router()

router.post('/login',authUser)
router.get('/me',verifyToken,infoUser)

export default router