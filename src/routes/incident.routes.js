import { Router } from "express";
import { incidenUpdate, incidentAll, incidentCreate, incidentDelete, incidentFromUs, incidentId } from "../controllers/incident.controller.js";

const router = Router()

router.get('/all',incidentAll)
router.get('/:id',incidentId)
router.get('/u/:id',incidentFromUs)
router.post('/',incidentCreate)
router.patch('/:id',incidenUpdate)
router.delete('/:id',incidentDelete)

export default router