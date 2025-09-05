import { Server } from "socket.io";
import { subscriber } from "./redis.js";

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });
  const onlineUsers = new Map<number, string>();
  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
    socket.on("register", (userId: number) => {
      onlineUsers.set(userId, socket.id);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      for (const [uid, sid] of onlineUsers.entries()) {
        if (sid === socket.id) {
          onlineUsers.delete(uid);
        }
      }
    });
  });
  subscriber.subscribe("chat-channel", (message) => {
    const data = JSON.parse(message);
    const socketId = onlineUsers.get(data.receiverId);
    if (socketId) {
      io.to(socketId).emit("newMessage", data);
    }
  });
  return io;
};
