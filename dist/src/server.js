import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from '../routes/authRoutes.js';
const app = express();
const port = process.env.PORT || 5101;
app.use(cors());
app.use(bodyParser.json());
// router
app.use('/api/v1', authRouter);
const start = async () => {
    try {
        app.listen(`Server is listening on port ${port}....`);
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=server.js.map