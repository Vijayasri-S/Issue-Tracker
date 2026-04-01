import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Department } from "../models/Department.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ---------------- Register Department/Admin ----------------
const registerDepartment = asyncHandler(async (req, res) => {
  const { username, email, password, fullname, department, designation } = req.body;

  if ([username, email, password, fullname, department, designation].some(
      (field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedDepartment = await Department.findOne({
    $or: [{ username }, { email }]
  });
  if (existedDepartment) {
    throw new ApiError(409, "Department incharge already exists");
  }

  const newDepartment = await Department.create({
    username,
    email,
    password,
    fullname,
    department,
    designation,
  });

  const createdDepartment = await Department.findById(newDepartment._id)
    .select("-password -refreshToken");

  if (!createdDepartment) throw new ApiError(500, "Something went wrong");

  return res.status(201).json(
    new ApiResponse(201, { ...createdDepartment.toObject(), role: "admin" }, "Department registered successfully")
  );
});

// ---------------- Admin Login ----------------
const loginDepartment = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const department = await Department.findOne({ email });
  if (!department) throw new ApiError(404, "Admin not found");

  const isPasswordCorrect = await department.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new ApiError(401, "Invalid credentials");

  const accessToken = department.generateAccessToken();
  const refreshToken = department.generateRefreshToken();

  department.refreshToken = refreshToken;
  await department.save();

  res.status(200).json({
    success: true,
    data: {
      _id: department._id,
      username: department.username,
      email: department.email,
      fullname: department.fullname,
      department: department.department,
      designation: department.designation,
      role: "admin"
    },
    token: accessToken
  });
});

// ---------------- Get All Departments ----------------
const getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({}).select("_id department fullname designation");
  
  if (!departments || departments.length === 0) {
    throw new ApiError(404, "No departments found");
  }
  
  return res.status(200).json(
    new ApiResponse(200, departments, "Departments fetched successfully")
  );
});

export { registerDepartment, loginDepartment, getAllDepartments };