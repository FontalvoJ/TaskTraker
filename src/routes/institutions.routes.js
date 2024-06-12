import { Router } from "express";
import { validateRoles } from "../middlewares/authJwt";
import { authJwt } from "../middlewares/authJwt";
import * as institutionCtrl from "../controllers/institutions.controller";

const router = Router();

// Get all intitution (admin)
router.get("/", [authJwt.verifyToken, validateRoles('admin')], institutionCtrl.getInstitutions);

// Get a intitution by ID (admin)
router.get("/intitutionId", [authJwt.verifyToken, validateRoles('admin')], institutionCtrl.getInstitutionById);

// Update a intitution by ID (only institution role)
router.put("/:intitutionId", [authJwt.verifyToken, validateRoles('institution')], institutionCtrl.updateInstitutionById);

// Delete a intitution by ID (admin and institutions)
router.delete("/:intitutionId", [authJwt.verifyToken, validateRoles('admin')], institutionCtrl.deleteInstitutionById);

export default router;
