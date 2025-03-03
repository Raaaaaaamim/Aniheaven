import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const decodeUser = async (c: Context, next: Next) => {
  const token = getCookie(c, "token");

  if (token) {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    const isValidId = mongoose.Types.ObjectId.isValid(decodedToken.id);
    if (isValidId) {
      c.set("USER_ID", decodedToken.id);
    }
  } else {
    c.set("USER_ID", null);
  }

  await next();
};
