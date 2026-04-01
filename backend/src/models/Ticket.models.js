import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    issueType: {
      type: String,
      enum: [
        "transport",
        "classroom",
        "labs",
        "hostel_electrical",
        "water_supply",
        "food",
        "placement",
        "peers",
        "others"
      ],
      required: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    severity: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    status: {
      type: String,
      enum: ["active", "in_progress", "resolved"],
      default: "active"
    },

    // Reference to the student (User)
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Reference to the department in-charge
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true
    }
  },
  { timestamps: true }
);

export const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
