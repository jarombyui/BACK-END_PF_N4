import { Router } from "express";
import { commentId, commentfromInc, commentstAll } from "../controllers/comment.controller.js";

const router = Router()

router.get('/all',commentstAll)
router.get('/:id',commentId)
router.get('/i/:idInc',commentfromInc)

export default router