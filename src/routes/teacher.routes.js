import { Router } from "express";
import { validateRoles } from "../middlewares/authJwt";
import { authJwt } from "../middlewares/authJwt";
import * as teacherCtrl from "../controllers/teacher.controllers";

const router = Router();

// Get all teachers (only accessible to admin and institution)
//router.get("/", [authJwt.verifyToken, validateRoles('admin', 'institution')], teacherCtrl.getTeachers);
router.get("/", teacherCtrl.getTeachers);


// Get teacher by ID (accessible to admin and institution)
router.get("/:teacherId", [authJwt.verifyToken, validateRoles('admin', 'institution')], teacherCtrl.getTeacherById);

// Update a teacher by ID (only the teacher themselves)
router.put("/:teacherId", [authJwt.verifyToken, validateRoles('teacher')], teacherCtrl.updateTeacherById);

// Delete a teacher by ID (only accessible to admin and institution)
router.delete("/:teacherId", [authJwt.verifyToken, validateRoles('admin', 'institution')], teacherCtrl.deleteTeacherById);

export default router;
