import { Server } from "socket.io";
import http from "http";

class SocketService {
  private static instance: SocketService;
  private io: Server;
  private onlineUsers: Map<number, string>; // userId → socketId

  private constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: { origin: "*" },
    });
    this.onlineUsers = new Map();

    this.io.on("connection", (socket) => {
      console.log("User Connected:", socket.id);

      // when user registers, map userId → socketId
      socket.on("register", (userId: number) => {
        this.onlineUsers.set(userId, socket.id);
        this.io.emit("userOnline", { userId });
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
        for (const [uid, sid] of this.onlineUsers.entries()) {
          if (sid === socket.id) {
            this.onlineUsers.delete(uid);
            this.io.emit("userOffline", { userId: uid });
          }
        }
      });
    });
  }

  // Singleton instance getter
  public static getInstance(server?: http.Server): SocketService {
    if (!SocketService.instance) {
      if (!server) {
        throw new Error("SocketService requires a server on first init");
      }
      SocketService.instance = new SocketService(server);
    }
    return SocketService.instance;
  }

  public getSocket(): Server {
    return this.io;
  }

  public getOnlineUsers(): Map<number, string> {
    return this.onlineUsers;
  }

  public getSocketId(userId: number): string | undefined {
    return this.onlineUsers.get(userId);
  }
}

export default SocketService;
