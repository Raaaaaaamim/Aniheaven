import type { Context } from "hono";
import { StatusCodes, validateEmail } from "../../features/utils.js";
import type { UserType } from "../../interfaces/user.js";
import User from "../../models/user.js";
const updateUserEmail = async (c: Context) => {
  const body = await c.req.json();
  if (!body) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  const { email } = body;

  if (!email) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  const feedback = validateEmail(email);
  if (feedback.length > 0) {
    return c.json(
      { success: false, message: "Email is not valid", feedback },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  const user: UserType = c.get("USER");
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return c.json(
      { success: false, message: "Email already exists" },
      { status: StatusCodes.CONFLICT }
    );
  }

  user.email = email;
  let updatedUser = await user.save();
  return c.json({
    success: true,
    message: "Email updated",
    user: updatedUser,
  });
};

export default updateUserEmail;
