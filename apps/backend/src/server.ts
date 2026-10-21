import { buildApp } from "./app.js";
import { readConfig } from "./config.js";

const config = readConfig();
const app = buildApp({
  logger: { level: config.logLevel },
  corsOrigin: config.corsOrigin,
});

let shuttingDown = false;

async function shutdown(signal: NodeJS.Signals) {
  if (shuttingDown) return;
  shuttingDown = true;

  app.log.info({ signal }, "Shutting down server");

  try {
    await app.close();
  } catch (error) {
    app.log.error(error, "Failed to shut down server");
    process.exitCode = 1;
  }
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

try {
  await app.listen({ host: config.host, port: config.port });
} catch (error) {
  app.log.error(error, "Failed to start server");
  await app.close();
  process.exitCode = 1;
}
