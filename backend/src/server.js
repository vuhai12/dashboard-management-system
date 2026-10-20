import "dotenv/config";
import app from "./app.js";
import { sequelize } from "./models/index.js";
import { initializeAdmin } from "./config/initializeAdmin.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Create admin if it doesn't exist
    await initializeAdmin();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
