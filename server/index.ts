import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import documentRoutes from "./routes/documentRoutes";

dotenv.config();

const app: Application = express();

app.use((req, res, next) => {
  const host = req.headers.host;
  cors({
    origin: `http://${host}`,
    credentials: true,
  })(req, res, next);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", documentRoutes); // Prefix all routes with /api

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
