import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import connectDB from "./db/index.js";
import { Server } from "socket.io";
import http from "http";

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

connectDB()
  .then(() => {
    console.log("Database connected successfully");

    const io = new Server(server, {
      cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
    });

    io.on("connection", (socket) => {
      console.log("Client connected", socket.id);

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });

    // Make io available in routes
    app.set("io", io);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("DB connection failed", err));
