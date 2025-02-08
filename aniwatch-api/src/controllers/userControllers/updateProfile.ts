import bcrypt from "bcrypt";
import type { Context } from "hono";
import cloudinary from "../../config/cloudinary.js";
import { checkPasswordStrength, StatusCodes } from "../../features/utils.js";
import type { UserType } from "../../interfaces/user.js";
import User from "../../models/user.js";
const updateProfile = async (c: Context) => {
  const user: UserType = c.get("USER");
  let { name, profilePicture, username, password }: Partial<UserType> =
    await c.req.json();

  if (!name && !profilePicture && !username && !password) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  // check if username is taken
  if (username) {
    const usernameExists = await User.findOne({
      username: username.trim(),
    });
    if (usernameExists) {
      return c.json(
        { success: false, message: "Username already exists" },
        { status: StatusCodes.CONFLICT }
      );
    }
  }

  // check if password is strong enough

  if (password) {
    const feedback = checkPasswordStrength(password);
    if (feedback.length > 0) {
      return c.json(
        { success: false, message: "Password is not strong enough", feedback },
        { status: StatusCodes.BAD_REQUEST }
      );
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      password = hashedPass;
    }
  }

  // check if profilePicture is provided
  if (profilePicture) {
    await cloudinary.uploader.destroy(user.profilePicture);
    const updatedPfp = await cloudinary.uploader.upload(profilePicture, {
      folder: "aniheavenUserPfps",
    });
    profilePicture = updatedPfp.secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        name,
        profilePicture,
        username,
        password,
      },
    },
    {
      new: true,
    }
  );

  return c.json(
    { success: true, message: "Profile updated", user: updatedUser },
    StatusCodes.OK
  );
};

export default updateProfile;
