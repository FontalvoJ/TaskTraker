import { Router } from "express";
import { validateRoles } from "../middlewares/authJwt";
import { authJwt } from "../middlewares/authJwt";
import * as projectsCtrl from "../controllers/projects.controller";

const router = Router();

// Create a new project (only accessible to teachers)
router.post("/", [authJwt.verifyToken, validateRoles('teacher')], projectsCtrl.createProject);

// Get all projects
router.get("/", projectsCtrl.getProjects);

// Get a project by ID (only accessible to teachers)
router.get("/:projectId", [authJwt.verifyToken, validateRoles('teacher')], projectsCtrl.getProjectById);

// Update a project by ID (only accessible to teachers)
router.put("/:projectId", [authJwt.verifyToken, validateRoles('teacher')], projectsCtrl.updateProjectById);

// Delete a project by ID (only accessible to teachers)
router.delete("/:projectId", [authJwt.verifyToken, validateRoles('teacher')], projectsCtrl.deleteProjectById);

export default router;
