import assert from "node:assert/strict";
import test from "node:test";
import { buildApp } from "../src/app.js";

test("health endpoint returns a JSON success response", async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({ method: "GET", url: "/health" });

  assert.equal(response.statusCode, 200);
  assert.equal(response.headers["content-type"], "application/json; charset=utf-8");
  assert.deepEqual(response.json(), { status: "ok" });
});

test("CORS preflight allows the configured frontend origin", async (t) => {
  const origin = "https://portfolio.example";
  const app = buildApp({ corsOrigin: [origin] });
  t.after(() => app.close());

  const response = await app.inject({
    method: "OPTIONS",
    url: "/health",
    headers: { origin, "access-control-request-method": "GET" },
  });

  assert.equal(response.statusCode, 204);
  assert.equal(response.headers["access-control-allow-origin"], origin);
});

test("CORS does not grant access to an unconfigured origin", async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: "GET",
    url: "/health",
    headers: { origin: "https://unconfigured.example" },
  });

  assert.equal(response.headers["access-control-allow-origin"], undefined);
});

test("unknown routes return 404", async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({ method: "GET", url: "/missing" });

  assert.equal(response.statusCode, 404);
});
