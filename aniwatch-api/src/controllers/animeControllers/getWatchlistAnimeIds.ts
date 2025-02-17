import type { Context } from "hono";
import { StatusCodes } from "../../features/utils.js";
import User from "../../models/user.js";

const getWatchlistAnimeIds = async (c: Context) => {
  const user = c.get("USER");

  // Ensure the watchlist is populated before selecting fields
  const watchlistAnimeIds = await User.findById(user._id)
    .populate("watchlist", "HiAnimeId")
    .select("watchlist");

  return c.json(
    {
      success: true,
      data: watchlistAnimeIds.watchlist,
    },
    { status: StatusCodes.OK }
  );
};

export default getWatchlistAnimeIds;
