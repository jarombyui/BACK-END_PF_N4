import { Router } from "express";
import { userCreate, userDelete, userId, userUpdate, usersAll } from "../controllers/user.controller.js";

const router = Router()

router.get('/all',usersAll)
router.get('/:id',userId)
router.post('/',userCreate)
router.patch('/:id',userUpdate)
router.delete('/:id',userDelete)


export default router