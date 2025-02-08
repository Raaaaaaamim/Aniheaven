import type { Context } from "hono";
import type mongoose from "mongoose";
import { StatusCodes } from "../../features/utils.js";
import type { UserType } from "../../interfaces/user.js";

const getWatchlist = async (c: Context) => {
  const user: mongoose.Document<UserType> = c.get("USER");

  const watchlist = await user.populate("watchlist");

  return c.json(
    {
      success: true,
      data: watchlist.watchlist,
    },
    { status: StatusCodes.OK }
  );
};

export default getWatchlist;
