import { Server } from "socket.io";
import http from "http";
class SocketService {
    static instance;
    io;
    onlineUsers; // userId → socketId
    constructor(server) {
        this.io = new Server(server, {
            cors: { origin: "*" },
        });
        this.onlineUsers = new Map();
        this.io.on("connection", (socket) => {
            console.log("User Connected:", socket.id);
            // when user registers, map userId → socketId
            socket.on("register", (userId) => {
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
    static getInstance(server) {
        if (!SocketService.instance) {
            if (!server) {
                throw new Error("SocketService requires a server on first init");
            }
            SocketService.instance = new SocketService(server);
        }
        return SocketService.instance;
    }
    getSocket() {
        return this.io;
    }
    getOnlineUsers() {
        return this.onlineUsers;
    }
    getSocketId(userId) {
        return this.onlineUsers.get(userId);
    }
}
export default SocketService;
//# sourceMappingURL=socket.js.map