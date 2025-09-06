import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";

import authRouter from "./routes/authRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import SocketService from "./libs/socket.js";
import { publisher, subscriber } from "./libs/redis.js";
import { getGroupMembers } from "./controllers/chatControllers.js"; // function to get members

const app = express();
const port = process.env.PORT || 5101;

app.use(cors());
app.use(bodyParser.json());

// Routers
app.use("/api/v1", authRouter);
app.use("/api/v1", authMiddleware, chatRouter);

// Create HTTP server
const server = http.createServer(app);

// Initialize singleton SocketService
const socketService = SocketService.getInstance(server);
const io = socketService.getSocket();

// 🔥 Redis Pub/Sub integration
(async () => {
  await subscriber.subscribe("chat-channel", async (message) => {
    const data = JSON.parse(message);
    console.log("Consumed from Redis", data);

    if (data.groupId) {
      // group message → fetch members
      const members = await getGroupMembers(data.groupId);
      members.forEach((memberId) => {
        const socketId = socketService.getSocketId(memberId);
        if (socketId) {
          io.to(socketId).emit("newGroupMessage", data);
        }
      });
    } else {
      // private message
      const socketId = socketService.getSocketId(data.receiverId);
      if (socketId) {
        io.to(socketId).emit("chat-message", data);
      }
    }
  });
})();
const start = async () => {
  try {
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}....`);
    });
  } catch (error: any) {
    console.log(error);
  }
};

start();
