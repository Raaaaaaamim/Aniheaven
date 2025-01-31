import type { Context } from "hono";
import { StatusCodes } from "../../features/utils.js";
import type { UserType } from "../../types/user.js";

const getMyProfile = async (c: Context): Promise<Response> => {
  const user: UserType = c.get("USER");
  if (!user) {
    return c.json(
      { success: false, message: "Unauthorized" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }

  return c.json({ success: true, user });
};

export default getMyProfile;
