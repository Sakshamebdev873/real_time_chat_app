import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const port = process.env.PORT || 5101;

app.use(cors());
app.use(bodyParser.json());

const start = async () => {
  try {
    app.listen(`Server is listening on port ${port}....`);
  } catch (error: any) {
    console.log(error);
  }
};
start();
