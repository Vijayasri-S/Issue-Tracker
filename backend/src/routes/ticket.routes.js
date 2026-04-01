import { Router } from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getTicketsByDepartment,
  updateTicketStatus
} from "../controllers/Ticket.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Student routes
router.post("/", createTicket);
router.get("/", getTickets); 
router.get("/:id", getTicketById);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

// Admin routes (auth required)
router.get("/admin/tickets", authMiddleware, getTicketsByDepartment);
router.put("/admin/status/:id", authMiddleware, updateTicketStatus);

export default router;
