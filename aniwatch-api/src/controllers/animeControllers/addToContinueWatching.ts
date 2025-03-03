import type { Context } from "hono";
import { StatusCodes } from "../../features/utils.js";
import type { continueWatchingType } from "../../interfaces/continueWatching.js";
import ContinueWatching from "../../models/continueWatching.js";
import User from "../../models/user.js";

const addToContinueWatching = async (c: Context): Promise<Response | void> => {
  const body = await c.req.json();

  if (!body || !(body instanceof Object)) {
    return c.json(
      { success: false, message: "Invalid request body" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const {
    HiAnimeId,
    name,
    poster,
    type,
    duration,
    startFrom,
    jname,
    episodes,
    epNumber,
    epId,
  }: continueWatchingType = body;

  if (!HiAnimeId) {
    return c.json(
      { success: false, message: "HiAnime Id is required" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  const user = c.get("USER");

  // Validate duration if provided
  if (
    (duration !== undefined && isNaN(Number(duration))) ||
    (startFrom !== undefined && isNaN(Number(startFrom)))
  ) {
    return c.json(
      {
        success: false,
        message: "Duration and startFrom must be numbers",
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const alreadyExists = await ContinueWatching.findOne({
    HiAnimeId,
    author: user._id,
  });

  if (alreadyExists) {
    // Update existing continue watching
    const updates: Partial<continueWatchingType> = {};

    if (epNumber !== undefined) updates.epNumber = epNumber;
    if (epId !== undefined) updates.epId = epId;
    if (startFrom !== undefined) updates.startFrom = startFrom;
    if (duration !== undefined) updates.duration = Number(duration);

    Object.assign(alreadyExists, updates);
    await alreadyExists.save();

    return c.json(
      { success: true, message: "Continue watching updated" },
      { status: StatusCodes.OK }
    );
  }

  // For new entries, validate all required fields
  const requiredFields = {
    HiAnimeId,
    name,
    poster,
    type,
    duration,
    startFrom,
    jname,
    episodes,
    epNumber,
    epId,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return c.json(
      {
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  if (!episodes.sub || !episodes.dub) {
    return c.json(
      {
        success: false,
        message: "Missing required episode counts for sub and dub",
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  if (isNaN(Number(episodes.sub)) || isNaN(Number(episodes.dub))) {
    return c.json(
      {
        success: false,
        message: "Episode counts must be numbers",
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  // Create new continue watching entry
  const newContinueWatching = await ContinueWatching.create({
    HiAnimeId,
    author: user._id,
    name,
    poster,
    type,
    duration: Number(duration),
    startFrom,
    jname,
    episodes: {
      sub: Number(episodes.sub),
      dub: Number(episodes.dub),
    },
    epNumber,
    epId,
  });

  await User.findByIdAndUpdate(user._id, {
    $push: { continueWatching: newContinueWatching._id },
  });

  return c.json(
    {
      success: true,
      message: "Added to continue watching",
      data: newContinueWatching,
    },
    { status: StatusCodes.CREATED }
  );
};

export default addToContinueWatching;
