import type { Context } from "hono";
import { StatusCodes } from "../../features/utils.js";

const getContinueWatching = async (c: Context) => {
  const user = c.get("USER");

  if (!user) {
    return c.json(
      { success: false, message: "User not authenticated" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }

  // Since user is a Mongoose document, we can populate it directly
  await user.populate("continueWatching");

  return c.json(
    {
      success: true,
      data: user.continueWatching,
    },
    { status: StatusCodes.OK }
  );
};

export default getContinueWatching;
