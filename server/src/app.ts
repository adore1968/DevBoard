import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

// Middlewares globales
app.use(helmet());

app.use(cors({ origin: "https://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

// Ruta de prueba
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "DevBoard API is running",
  });
});

export default app;
