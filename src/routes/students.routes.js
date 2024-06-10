import { Router } from "express";
import { validateRoles } from "../middlewares/authJwt";
import { authJwt } from "../middlewares/authJwt";
import * as studentCtrl from "../controllers/students.controllers";

const router = Router();

// Get all students (admin, teacher, and institutions)
router.get("/", [authJwt.verifyToken, validateRoles('admin', 'institution', 'teacher')], studentCtrl.getStudents);

// Get a student by ID (admin and teacher)
router.get("/:studentId", [authJwt.verifyToken, validateRoles('admin', 'institution', 'teacher')], studentCtrl.getStudentById);

// Update a student by ID (only the student themselves)
router.put("/:studentId", [authJwt.verifyToken, validateRoles('student')], studentCtrl.updateStudentById);

// Delete a student by ID (admin, institution, or teacher)
router.delete("/:studentId", [authJwt.verifyToken, validateRoles('admin', 'institution', 'teacher')], studentCtrl.deleteStudentById);

export default router;
