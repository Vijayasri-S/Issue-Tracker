import mongoose from "mongoose";
import { Ticket } from "../models/Ticket.models.js";
import { Department } from "../models/Department.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getDepartmentTickets = asyncHandler(async (req, res) => {
  const admin = req.user;
  
  console.log("🔍 Admin data:", admin);
  console.log("🔍 Admin department:", admin.department);
  
  if (admin.role !== "admin") throw new ApiError(403, "Access denied");

  const departmentDoc = await Department.findOne({ 
    department: admin.department 
  });

  console.log("🔍 Found department doc:", departmentDoc);

  if (!departmentDoc) {
    return res.status(200).json(
      new ApiResponse(200, [], "No department found")
    );
  }

  const tickets = await Ticket.find({ department: departmentDoc._id })
    .populate("user", "-password -refreshToken")
    .populate("department");

  console.log("🔍 Found tickets:", tickets.length);

  res.status(200).json(new ApiResponse(200, tickets, "Tickets fetched successfully"));
});

const updateTicketForAdmin = asyncHandler(async (req, res) => {
  const admin = req.user;
  const { id } = req.params;
  const { status, severity, issueType } = req.body;

  const ticket = await Ticket.findById(id).populate("department");
  if (!ticket) throw new ApiError(404, "Ticket not found");

  if (ticket.department.department !== admin.department) {
    throw new ApiError(403, "Cannot update this ticket");
  }

  ticket.status = status || ticket.status;
  ticket.severity = severity || ticket.severity;
  ticket.issueType = issueType || ticket.issueType;

  await ticket.save();

  req.app.get("io")?.emit("ticketUpdated", ticket);

  res.status(200).json(new ApiResponse(200, ticket, "Ticket updated successfully"));
});

export { getDepartmentTickets, updateTicketForAdmin };