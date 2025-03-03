import type { Context } from "hono";
import { StatusCodes } from "../../features/utils.js";
import User from "../../models/User.js";

const getContinueWatching = async (c: Context) => {
  const user = c.get("USER");
  const page = Number(c.req.query("page")) || 1;
  const itemsPerPage = 10;
  const itemsToSkip = (page - 1) * itemsPerPage;

  // 1. Efficiently get the count of continueWatching
  const countResult = await User.aggregate([
    { $match: { _id: user._id } },
    {
      $project: {
        continueWatchingCount: { $size: "$continueWatching" },
        _id: 0,
      },
    },
  ]);

  const continueWatchingCount =
    countResult.length > 0 ? countResult[0].continueWatchingCount : 0;
  const totalPages = Math.ceil(continueWatchingCount / itemsPerPage);

  // 2. Handle pagination edge cases
  if (page > totalPages || page < 1) {
    return c.json(
      {
        success: true,
        data: [],
        hasNextPage: false,
      },
      StatusCodes.OK
    );
  }

  const hasNextPage = page < totalPages;

  // 3. Populate with correct path and pagination
  const populatedUser = await User.findById(user._id).populate({
    path: "continueWatching",
    options: { skip: itemsToSkip, limit: itemsPerPage },
  });

  // 4. Handle potential null populatedUser and missing continueWatching
  const continueWatching = populatedUser?.continueWatching || [];

  return c.json(
    {
      success: true,
      data: continueWatching,
      hasNextPage,
    },
    StatusCodes.OK
  );
};

export default getContinueWatching;
