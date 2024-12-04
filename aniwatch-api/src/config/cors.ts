import { config } from "dotenv";
import { cors } from "hono/cors";

config();

const allowedOrigins = process.env.ANIWATCH_API_CORS_ALLOWED_ORIGINS
  ? process.env.ANIWATCH_API_CORS_ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "*"];
console.log(allowedOrigins);

const corsConfig = cors({
  allowMethods: ["GET", "OPTIONS"],
  maxAge: 600,
  credentials: true,
  origin: (origin) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      allowedOrigins.includes("*")
    ) {
      return origin;
    }
    return null;
  },
});

export default corsConfig;
