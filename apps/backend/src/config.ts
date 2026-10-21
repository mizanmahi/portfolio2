export function readConfig(env: NodeJS.ProcessEnv = process.env) {
  const port = Number(env.PORT ?? "3001");

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  const logLevel = env.LOG_LEVEL ?? "info";
  const logLevels = ["fatal", "error", "warn", "info", "debug", "trace", "silent"];

  if (!logLevels.includes(logLevel)) {
    throw new Error(`LOG_LEVEL must be one of: ${logLevels.join(", ")}`);
  }

  const corsOrigin = (env.CORS_ORIGIN ?? "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (corsOrigin.length === 0) {
    throw new Error("CORS_ORIGIN must contain at least one frontend origin");
  }

  return {
    host: env.HOST ?? "127.0.0.1",
    port,
    logLevel,
    corsOrigin,
  };
}
