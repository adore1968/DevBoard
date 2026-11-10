import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectDatabase from "./config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`DevBoard API running on port ${PORT}`);
  });
};

startServer();
