import { Router } from "express";
import { registerDepartment, loginDepartment, getAllDepartments } from "../controllers/Department.controller.js";

const router = Router();

// Department registration
router.post("/register", registerDepartment);

// Department login
router.post("/login", loginDepartment);

// Get all departments
router.get("/", getAllDepartments);  // <-- ADD THIS LINE

export default router;