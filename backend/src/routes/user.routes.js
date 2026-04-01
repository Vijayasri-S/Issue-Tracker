import { Router } from "express";
import { getUsers, registerUser, loginUser } from "../controllers/User.controller.js";

const router = Router();

// Student registration
router.post("/register", registerUser);

// Student login
router.post("/login", loginUser);

// Get all users (optional)
router.get("/", getUsers);

export default router;
