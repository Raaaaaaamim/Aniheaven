import type { Context } from "hono";
import { StatusCodes } from "../../features/utils.js";
import User from "../../models/User.js"; // Ensure User model is imported

const getContinueWatching = async (c: Context) => {
  const user = c.get("USER");
  const page = Number(c.req.param("page")) || 1; // Ensure valid number
  const itemsPerPage = 10;
  const itemsToSkip = (page - 1) * itemsPerPage;

  if (!user) {
    return c.json(
      { success: false, message: "User not authenticated" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }

  // Fetch user with paginated continueWatching
  const populatedUser = await User.findById(user._id)
    .populate({
      path: "continueWatching",
      options: { skip: itemsToSkip, limit: itemsPerPage },
    })
    .exec();

  return c.json(
    {
      success: true,
      data: populatedUser?.continueWatching || [],
    },
    { status: StatusCodes.OK }
  );
};

export default getContinueWatching;
