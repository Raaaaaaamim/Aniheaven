import { config } from "dotenv";
import { cors } from "hono/cors";

config();

const allowedOrigins = process.env.ANIWATCH_API_CORS_ALLOWED_ORIGINS
  ? process.env.ANIWATCH_API_CORS_ALLOWED_ORIGINS.split(",")
  : ["http://localhost:4000"];

const corsConfig = cors({
  allowMethods: ["GET", "POST", "PATCH", "DELETE"],
  maxAge: 600,
  credentials: true,
  origin: (origin) => {
    // Return the origin if it's allowed, null otherwise
    return allowedOrigins.includes(origin) ? origin : null;
  },
  exposeHeaders: ["Set-Cookie"],
  allowHeaders: ["Content-Type", "Authorization", "Cookie"],
});

export default corsConfig;
