import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from './routes/authRoutes.js';
import chatRouter from './routes/chatRoutes.js';
const app = express();
const port = process.env.PORT || 5101;
app.use(cors());
app.use(bodyParser.json());
// router
app.use('/api/v1', authRouter);
app.use('/api/v1', chatRouter);
const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}....`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=server.js.map