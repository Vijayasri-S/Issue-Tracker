import { Router } from "express";
import { getDepartmentTickets, updateTicketForAdmin } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// All routes require auth middleware
router.get("/tickets", authMiddleware, getDepartmentTickets);
router.put("/tickets/:id", authMiddleware, updateTicketForAdmin);

export default router;
