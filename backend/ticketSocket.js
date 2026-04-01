import { io } from "socket.io-client";

// Connect to your backend server
const socket = io("http://localhost:8000");

// Listen for connection
socket.on("connect", () => {
  console.log("Connected to server with ID:", socket.id);
});

// Listen for ticket updates
socket.on("ticketUpdated", (data) => {
  console.log("Ticket Updated:", data);
});

// Listen for disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
