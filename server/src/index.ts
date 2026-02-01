import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import routes from "./routes";
import { initCleanup } from "./storage";
import "dotenv/config";

// SERVER SETUP

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// Register routes
app.use(routes);

// Initialize cleanup
initCleanup();

server.listen(3001, () => {
  console.log("Backend running on port 3001");
});