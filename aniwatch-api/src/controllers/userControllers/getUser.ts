import type { Context } from "hono";
import mongoose from "mongoose";
import { StatusCodes } from "../../features/utils.js";
import User from "../../models/user.js";
const getUser = async (c: Context): Promise<Response | void> => {
  const id = c.req.param("id");
  if (id === undefined) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  //check is the mongoose id is valid
  const isValid = mongoose.Types.ObjectId.isValid(id);

  const user = await User.findOne({
    $or: [{ _id: isValid ? id : undefined }, { username: id }],
  });
  if (!user) {
    return c.json(
      { success: false, message: "User not found" },
      { status: StatusCodes.NOT_FOUND }
    );
  }
  user.password = "";
  user.emailVerificationToken = 0;
  return c.json(
    {
      success: true,
      message: "User found",
      user: {
        ...user.toObject(),
        password: "",
        emailVerificationToken: 0,
        createdAt: "",
        updatedAt: "",
      },
    },
    StatusCodes.OK
  );
};

export default getUser;
