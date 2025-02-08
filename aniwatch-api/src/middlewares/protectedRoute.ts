import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import jwt from "jsonwebtoken";
import type mongoose from "mongoose";
import { StatusCodes } from "../features/utils.js";
import type { UserType } from "../interfaces/user.js";
import User from "../models/user.js";
const protectedRoute = async (
  c: Context,
  next: Next
): Promise<void | Response> => {
  // get the token from the cookie
  const protectedToken = getCookie(c, "token");
  // if no token is NOT found return unauthorized
  if (!protectedToken) {
    return c.json(
      { success: false, message: "Unauthorized" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }
  const decodedToken = <jwt.JwtPayload>(
    jwt.verify(protectedToken, process.env.JWT_SECRET as string)
  );
  if (!decodedToken.id) {
    return c.json(
      { success: false, message: "Unauthorized" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }
  // check if the user exists
  const user = (await User.findOne({
    _id: decodedToken.id,
  })) as mongoose.Document<UserType>;
  if (!user) {
    return c.json(
      { success: false, message: "Unauthorized" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }

  c.set("USER", user);
  await next();
};

export default protectedRoute;
