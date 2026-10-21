import assert from "node:assert/strict";
import test from "node:test";
import { readConfig } from "../src/config.js";

test("configuration works without an env file", () => {
  assert.deepEqual(readConfig({}), {
    host: "127.0.0.1",
    port: 3001,
    logLevel: "info",
    corsOrigin: ["http://localhost:3000"],
  });
});

test("environment overrides configure the listener and multiple origins", () => {
  assert.deepEqual(
    readConfig({
      HOST: "0.0.0.0",
      PORT: "4001",
      LOG_LEVEL: "debug",
      CORS_ORIGIN: "http://localhost:3000, https://portfolio.example ",
    }),
    {
      host: "0.0.0.0",
      port: 4001,
      logLevel: "debug",
      corsOrigin: ["http://localhost:3000", "https://portfolio.example"],
    },
  );
});

test("invalid ports are rejected before starting the server", () => {
  for (const port of ["", "0", "-1", "65536", "3001.5", "invalid"]) {
    assert.throws(() => readConfig({ PORT: port }), /PORT must be an integer/);
  }
});

test("invalid logging and empty origins are rejected", () => {
  assert.throws(() => readConfig({ LOG_LEVEL: "invalid" }), /LOG_LEVEL/);
  assert.throws(() => readConfig({ CORS_ORIGIN: " , " }), /CORS_ORIGIN/);
});
