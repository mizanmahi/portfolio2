import cors from "@fastify/cors";
import Fastify, { type FastifyServerOptions } from "fastify";
import { healthRoutes } from "./routes/health.js";

type AppOptions = FastifyServerOptions & {
  corsOrigin?: string[];
};

export function buildApp({
  corsOrigin = ["http://localhost:3000"],
  ...options
}: AppOptions = {}) {
  const app = Fastify(options);

  app.register(cors, { origin: corsOrigin });
  app.register(healthRoutes);

  return app;
}
