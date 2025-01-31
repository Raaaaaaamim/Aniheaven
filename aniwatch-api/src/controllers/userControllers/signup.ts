import bcrypt from "bcrypt";
import type { Context } from "hono";
import cloudinary from "../../config/cloudinary.js";
import {
  checkPasswordStrength,
  generateTokenAndSendCookie,
  StatusCodes,
  validateEmail,
} from "../../features/utils.js";

import User from "../../models/user.js";
import type { UserType } from "../../types/user.js";

const signUp = async (c: Context): Promise<Response> => {
  const body = await c.req.json();
  if (!body) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  let { email, password, name, profilePicture, username }: Partial<UserType> =
    body;
  if (!email || !password || !name || !profilePicture || !username) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  // check if password is strong enough
  const feedback = checkPasswordStrength(password);
  if (feedback.length > 0) {
    return c.json(
      { success: false, message: "Password is not strong enough", feedback },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  // check if email is valid
  const feedbackEmail = validateEmail(email);
  if (feedbackEmail.length > 0) {
    return c.json(
      {
        success: false,
        message: "Email is not valid",
        feedback: feedbackEmail,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  // find if user exists

  const user = await User.findOne({
    $or: [{ email: email.trim() }, { username: username.trim() }],
  });
  if (user) {
    return c.json(
      { success: false, message: "User already exists" },
      { status: StatusCodes.CONFLICT }
    );
  }
  // hash the pass
  const hashedPass = await bcrypt.hash(password, 10);
  password = hashedPass;

  // upload the profilePicture to cloudinary
  const result = await cloudinary.uploader.upload(profilePicture, {
    folder: "aniheavenUserPfps",
  });
  // if user doesn't exit then create a new one
  const newUser = await User.create({
    username,
    name,
    profilePicture: result.secure_url,
    password,
    email,
  });
  generateTokenAndSendCookie(c, newUser._id);
  return c.json(
    {
      success: true,
      user: newUser,
    },
    StatusCodes.CREATED
  );
};

export default signUp;
