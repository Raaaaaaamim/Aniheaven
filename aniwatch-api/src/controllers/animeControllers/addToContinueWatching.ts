import type { Context } from "hono";
import { StatusCodes } from "../../features/utils.js";
import ContinueWatching from "../../models/continueWatching.js";
import type { continueWatchingType } from "../../types/continueWatching.js";

const addToContinueWatching = async (c: Context): Promise<Response | void> => {
  const body = await c.req.json();
  if (!body) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  if (!(body instanceof Object)) {
    return c.json(
      { success: false, message: "Invalid request" },
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
    link,
  }: continueWatchingType = body;
  if (
    !HiAnimeId ||
    !name ||
    !poster ||
    !type ||
    !duration ||
    !startFrom ||
    !jname ||
    !episodes ||
    !epNumber ||
    !link
  ) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  if (!episodes.sub || !episodes.dub) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  const user = c.get("USER");
  const alreadyExists = await ContinueWatching.findOne({
    $and: [{ HiAnimeId }, { author: user._id }],
  });
  if (alreadyExists) {
    // update the existing continue watching
    alreadyExists.epNumber = epNumber || alreadyExists.epNumber;
    alreadyExists.link = link || alreadyExists.link;
    alreadyExists.startFrom = startFrom || alreadyExists.startFrom;
    alreadyExists.duration = duration || alreadyExists.duration;
    await alreadyExists.save();
    return c.json(
      { success: true, message: "Continue watching updated" },
      { status: StatusCodes.OK }
    );
  }
  const newContinueWatching = await ContinueWatching.create({
    HiAnimeId,
    name,
    poster,
    type,
    duration,
    startFrom,
    jname,
    episodes,
    link,
  });

  const continueWatchingId = newContinueWatching._id;
  user.continueWatching.push(continueWatchingId);
  await user.save();
  return c.json(
    { success: true, message: "Anime added to continue watching" },
    { status: StatusCodes.OK }
  );
};

export default addToContinueWatching;
