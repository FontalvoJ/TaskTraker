import { Router } from "express";
import { validateRoles } from "../middlewares/authJwt";
import { authJwt } from "../middlewares/authJwt";
import * as institutionCtrl from "../controllers/institutions.controller";

const router = Router();

// Get all students (admin and institutions)
router.get("/", [authJwt.verifyToken, validateRoles('admin', 'institution')], institutionCtrl.getInstitutions);

// Get a student by ID (admin and institutions)
router.get("/:studentId", [authJwt.verifyToken, validateRoles('admin', 'institution')], institutionCtrl.getInstitutionById);

// Update a student by ID (only institution role)
router.put("/:studentId", [authJwt.verifyToken, validateRoles('institution')], institutionCtrl.updateInstitutionById);

// Delete a student by ID (admin and institutions)
router.delete("/:studentId", [authJwt.verifyToken, validateRoles('admin', 'institution')], institutionCtrl.deleteInstitutionById);

export default router;
