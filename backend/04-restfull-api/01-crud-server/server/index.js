import http from "http";
import app from "./src/app.js";
import { NODE_ENV, PORT } from "./src/common/config/envConfig.js";
import connectDB from "./src/common/config/db.js";

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`,
      );
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
