import type { Context } from "hono";
import { StatusCodes } from "../../features/utils.js";
import type { UserType } from "../../interfaces/user.js";
import User from "../../models/user.js";
import WatchlistAnime from "../../models/watchlistAnime.js";

const addToWatchlist = async (c: Context) => {
  const body = await c.req.json();
  const user: UserType = c.get("USER");

  if (!body || typeof body !== "object") {
    return c.json(
      { success: false, message: "Invalid request body" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const { HiAnimeId, name, poster, type, jname, episodes } = body;

  // Check for missing required fields
  const requiredFields = ["HiAnimeId", "name", "poster", "jname", "episodes"];
  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    return c.json(
      {
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  // Check if anime already exists in user's watchlist
  const animeExists = await WatchlistAnime.exists({
    $and: [{ HiAnimeId }, { author: user._id }],
  });

  if (animeExists) {
    const deletedAnime = await WatchlistAnime.findOneAndDelete({
      $and: [{ HiAnimeId }, { author: user._id }],
    });
    if (deletedAnime) {
      await User.findByIdAndUpdate(user.id, {
        $pull: { watchlist: deletedAnime._id },
      });
      return c.json(
        {
          success: true,
          message: "Anime removed from watchlist",
          id: deletedAnime?.HiAnimeId,
          removed: true,
        },
        { status: StatusCodes.OK }
      );
    } else {
      return c.json(
        {
          success: false,
          message: "Failed to remove anime from watchlist",
        },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    }
  }

  // Create new watchlist entry
  const newWatchlistAnime = await WatchlistAnime.create({
    HiAnimeId,
    name,
    poster,
    type,
    jname,
    episodes,
    author: user._id,
  });
  await User.findByIdAndUpdate(user._id, {
    $push: {
      watchlist: newWatchlistAnime._id,
    },
  });
  return c.json(
    {
      success: true,
      message: "Anime added to watchlist successfully",
      id: newWatchlistAnime.HiAnimeId,
    },
    { status: StatusCodes.CREATED }
  );
};

export default addToWatchlist;
