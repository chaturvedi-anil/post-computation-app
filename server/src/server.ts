import app from "./app";
import { checkDatabaseConnection } from "./config/db";

const startServer = async () => {
  await checkDatabaseConnection();
  app.listen(5000, () => {
    console.info(`[INFO] : express server is listing on port ${5000} `);
  });
};

startServer().catch((err) => {
  console.error(`[ERORR] : server failed to start`, err);
  process.exit(1);
});
