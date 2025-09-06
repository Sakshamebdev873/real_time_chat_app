import { Server } from "socket.io";
import http from "http";
declare class SocketService {
    private static instance;
    private io;
    private onlineUsers;
    private constructor();
    static getInstance(server?: http.Server): SocketService;
    getSocket(): Server;
    getOnlineUsers(): Map<number, string>;
    getSocketId(userId: number): string | undefined;
}
export default SocketService;
//# sourceMappingURL=socket.d.ts.map