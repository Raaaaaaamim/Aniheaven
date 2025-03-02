import { config } from "dotenv";
import https from "https";

import corsConfig from "./config/cors.js";
import { ratelimit } from "./config/ratelimit.js";

import { hianimeRouter } from "./routes/hianime.js";

import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { logger } from "hono/logger";

import { HiAnimeError } from "aniwatch";
import type { AniwatchAPIVariables } from "./config/variables.js";
import { connectDb } from "./db/connectDb.js";
import user from "./routes/User.js";
import anime from "./routes/anime.js";

config();

export const BASE_PATH = "/api/v2" as const;
const PORT: number = Number(process.env.ANIWATCH_API_PORT) || 4000;
const ANIWATCH_API_HOSTNAME = process.env?.ANIWATCH_API_HOSTNAME;

const app = new Hono<{ Variables: AniwatchAPIVariables }>().basePath(BASE_PATH);

app.use(logger());
app.use(corsConfig);

// CAUTION: For personal deployments, "refrain" from having an env
// named "ANIWATCH_API_HOSTNAME". You may face rate limitting
// or other issues if you do.
const ISNT_PERSONAL_DEPLOYMENT = Boolean(ANIWATCH_API_HOSTNAME);
if (ISNT_PERSONAL_DEPLOYMENT) {
  app.use(ratelimit);
}

app.use("/", serveStatic({ root: "public" }));
app.get("/health", (c) => c.text("OK", { status: 200 }));
connectDb();
app.route("/user", user);
app.route("/anime", anime);

app.route("/hianime", hianimeRouter);
app.get("/anicrush", (c) => c.text("Anicrush could be implemented in future."));
app.notFound((c) =>
  c.json({ status: 404, message: "Resource Not Found" }, 404)
);

app.onError((err, c) => {
  console.error(err);
  const res = { status: 500, message: "Internal Server Error" };

  if (err instanceof HiAnimeError) {
    res.status = err.status;
    res.message = err.message;
  }

  return c.json(res, { status: res.status });
});

// NOTE: this env is "required" for vercel deployments
if (!Boolean(process.env?.ANIWATCH_API_VERCEL_DEPLOYMENT)) {
  serve({
    port: PORT,
    fetch: app.fetch,
  }).addListener("listening", () =>
    console.info(
      "\x1b[1;36m" + `aniwatch-api at http://localhost:${PORT}` + "\x1b[0m"
    )
  );

  // NOTE: remove the `if` block below for personal deployments
  if (ISNT_PERSONAL_DEPLOYMENT) {
    const interval = 9 * 60 * 1000; // 9mins

    // don't sleep
    setInterval(() => {
      console.log("aniwatch-api HEALTH_CHECK at", new Date().toISOString());
      https
        .get(`https://${ANIWATCH_API_HOSTNAME}/health`)
        .on("error", (err) => {
          console.error(err.message);
        });
    }, interval);
  }
}

export default app;
