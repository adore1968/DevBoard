import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

// Middlewares globales
app.use(helmet());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

// Ruta de prueba
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "DevBoard API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.use(errorMiddleware);

export default app;
