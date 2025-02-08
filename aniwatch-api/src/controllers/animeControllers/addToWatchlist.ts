import type { Context } from "hono";
import { StatusCodes } from "../../features/utils.js";
import type { UserType } from "../../interfaces/user.js";
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

  // Validate episodes structure
  if (
    !episodes ||
    typeof episodes !== "object" ||
    !episodes.sub ||
    !episodes.dub
  ) {
    return c.json(
      {
        success: false,
        message: "Episodes must include both sub and dub counts",
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  // Check if anime already exists in user's watchlist
  const existingAnime = await WatchlistAnime.findOne({
    HiAnimeId,
    author: user._id,
  });

  if (existingAnime) {
    return c.json(
      {
        success: false,
        message: "Anime already exists in your watchlist",
      },
      { status: StatusCodes.CONFLICT }
    );
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
  user.watchlist.push(newWatchlistAnime._id);
  await user.save();
  return c.json(
    {
      success: true,
      message: "Anime added to watchlist successfully",
    },
    { status: StatusCodes.CREATED }
  );
};

export default addToWatchlist;
