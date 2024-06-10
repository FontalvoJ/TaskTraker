import express from 'express';
import { validateRoles } from "../middlewares/authJwt";
import { authJwt } from "../middlewares/authJwt";
import { addStudentToProject } from '../controllers/studentProjects.controller';

const router = express.Router();

// Only students can add themselves to a project
router.post('/addStudentToProject', [authJwt.verifyToken, validateRoles('student')], addStudentToProject);

export default router;
