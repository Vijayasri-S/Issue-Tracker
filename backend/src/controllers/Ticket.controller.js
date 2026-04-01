import mongoose from "mongoose";
import { Ticket } from "../models/Ticket.models.js";
import { User } from "../models/User.models.js";
import { Department } from "../models/Department.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ========================= STUDENT TICKET CONTROLLERS ========================= //

// Create a new ticket
const createTicket = asyncHandler(async (req, res) => {
  const { issueType = "others", description, severity, userId, departmentId } = req.body;

  if ([description, severity, userId, departmentId].some(f => !f))
    throw new ApiError(400, "All fields are required");

  const ticket = await Ticket.create({ issueType, description, severity, user: userId, department: departmentId });
  const createdTicket = await Ticket.findById(ticket._id)
    .populate("user", "-password -refreshToken")
    .populate("department");

  res.status(201).json(new ApiResponse(201, createdTicket, "Ticket created successfully"));
});

// Get tickets for a student
const getTickets = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  if (!userId) throw new ApiError(400, "User ID is required");

  const tickets = await Ticket.find({ user: userId })
    .populate("user", "-password -refreshToken")
    .populate("department");

  res.status(200).json(new ApiResponse(200, tickets, "Tickets fetched successfully"));
});

// Get ticket by ID
const getTicketById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ticket ID");

  const ticket = await Ticket.findById(id)
    .populate("user", "-password -refreshToken")
    .populate("department");

  if (!ticket) throw new ApiError(404, "Ticket not found");
  res.status(200).json(new ApiResponse(200, ticket, "Ticket fetched successfully"));
});

// Update ticket
const updateTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { issueType, description, severity, departmentId, status } = req.body;

  const ticket = await Ticket.findById(id);
  if (!ticket) throw new ApiError(404, "Ticket not found");

  ticket.issueType = issueType || ticket.issueType;
  ticket.description = description || ticket.description;
  ticket.severity = severity || ticket.severity;
  ticket.department = departmentId || ticket.department;
  ticket.status = status || ticket.status;

  await ticket.save();

  const updatedTicket = await Ticket.findById(ticket._id)
    .populate("user", "-password -refreshToken")
    .populate("department");

  res.status(200).json(new ApiResponse(200, updatedTicket, "Ticket updated successfully"));
});

// Delete ticket
const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ticket = await Ticket.findByIdAndDelete(id);
  if (!ticket) throw new ApiError(404, "Ticket not found");

  res.status(200).json(new ApiResponse(200, null, "Ticket deleted successfully"));
});

// ========================= ADMIN SPECIFIC CONTROLLERS ========================= //

// Get tickets for admin's department
const getTicketsByDepartment = asyncHandler(async (req, res) => {
  const admin = req.user; // Populated by auth middleware
  if (admin.role !== "admin") throw new ApiError(403, "Access denied");

  // ✅ FIX: Admin's department is stored as STRING, not ObjectId
  // Find the Department document that matches admin's department string
  const departmentDoc = await Department.findOne({ 
    department: admin.department 
  });

  if (!departmentDoc) {
    return res.status(200).json(
      new ApiResponse(200, [], "No department found matching admin's department")
    );
  }

  // Now find tickets by the Department's _id
  const tickets = await Ticket.find({ department: departmentDoc._id })
    .populate("user", "-password -refreshToken")
    .populate("department");

  res.status(200).json(new ApiResponse(200, tickets, "Department tickets fetched successfully"));
});

// Update ticket status (admin only) and emit via Socket.IO
const updateTicketStatus = asyncHandler(async (req, res) => {
  const admin = req.user;
  if (admin.role !== "admin") throw new ApiError(403, "Access denied");

  const { id } = req.params;
  const { status } = req.body;
  if (!status) throw new ApiError(400, "Status is required");

  const ticket = await Ticket.findById(id)
    .populate("user", "-password -refreshToken")
    .populate("department");

  if (!ticket) throw new ApiError(404, "Ticket not found");

  // ✅ FIX: Check department by name string, not ObjectId
  if (ticket.department.department !== admin.department) {
    throw new ApiError(403, "Cannot update tickets from other departments");
  }

  ticket.status = status;
  await ticket.save();

  // Emit via Socket.IO to frontend
  req.app.get("io")?.emit("ticketUpdated", ticket);

  res.status(200).json(new ApiResponse(200, ticket, "Ticket status updated successfully"));
});

export {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getTicketsByDepartment,
  updateTicketStatus
};