import bcrypt from "bcrypt";
import type { Context } from "hono";
import {
  generateTokenAndSendCookie,
  StatusCodes,
} from "../../features/utils.js";
import User from "../../models/user.js";
const login = async (c: Context) => {
  const { req, res } = c;
  // check if email or username is provided
  const body = await req.json();
  const { email, password } = body;
  if (!email || !password) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  // check if user exists
  const user = await User.findOne({
    $or: [
      { email: email && email.trim() },
      { username: email && email.trim() },
    ],
  });
  if (!user) {
    return c.json(
      { success: false, message: "User not found" },
      { status: StatusCodes.NOT_FOUND }
    );
  }
  // check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return c.json(
      { success: false, message: "Invalid credentials" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }
  // generate token and send cookie
  generateTokenAndSendCookie(c, user._id);
  return c.json(
    { success: true, message: "Login successful", user },
    StatusCodes.OK
  );
};

export default login;
