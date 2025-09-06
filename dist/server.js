import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/authRoutes.js";
import http from "http";
import chatRouter from "./routes/chatRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { initSocket } from "./libs/socket.js";
import { publisher, subscriber } from "./libs/redis.js";
const app = express();
const port = process.env.PORT || 5101;
app.use(cors());
app.use(bodyParser.json());
// routers
app.use("/api/v1", authRouter);
app.use("/api/v1", authMiddleware, chatRouter);
const server = http.createServer(app);
const io = initSocket(server);
// 🔥 Redis pub/sub integration
(async () => {
    // subscribe to the redis channel
    await subscriber.subscribe("chat-channel", (message) => {
        const data = JSON.parse(message);
        console.log("Consumed from Redis", data);
        // broadcast message via socket.io
        io.to(data.receiverId?.toString() || "").emit("chat-message", data);
    });
})();
const start = async () => {
    try {
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}....`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=server.js.map