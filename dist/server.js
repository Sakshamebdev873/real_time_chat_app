import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/authRoutes.js";
import http from "http";
import chatRouter from "./routes/chatRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { initSocket } from "./libs/socket.js";
import { consumer, initKafka } from "./libs/kafka.js";
import { publisher } from "./libs/redis.js";
const app = express();
const port = process.env.PORT || 5101;
app.use(cors());
app.use(bodyParser.json());
// router
app.use("/api/v1", authRouter);
app.use("/api/v1", authMiddleware, chatRouter);
const server = http.createServer(app);
const io = initSocket(server);
(async () => {
    await initKafka();
    await consumer.subscribe({ topic: "chat-messages" });
    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(message.value.toString());
            console.log("Consumed from Kafka", data);
            await publisher.publish("chat-channel", JSON.stringify(data));
        },
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