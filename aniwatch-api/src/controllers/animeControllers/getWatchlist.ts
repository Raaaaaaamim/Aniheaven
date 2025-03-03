import type { Context } from "hono";
import { StatusCodes } from "../../features/utils.js";
import User from "../../models/User.js"; // Ensure User model is imported

const getContinueWatching = async (c: Context) => {
  const user = c.get("USER");
  const page = Number(c.req.query("page")) || 1; // Ensure page is a valid number
  const itemsPerPage = 15;
  const itemsToSkip = (page - 1) * itemsPerPage;

  const docs = await User.aggregate([
    { $match: { _id: user._id } },
    { $project: { watchlistCount: { $size: "$watchlist" }, _id: 0 } },
  ]);

  let watchlistCount = 0;
  if (docs.length > 0) {
    watchlistCount = docs[0].watchlistCount || 0;
  }
  const totalPages = Math.ceil(Number(watchlistCount) / itemsPerPage);

  if (page > totalPages) {
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

  // Fetch user with properly paginated continueWatching
  const populatedUser = await User.findById(user._id).populate({
    path: "watchlist",
    options: { skip: itemsToSkip, limit: itemsPerPage }, // Proper way to apply pagination
  });
  console.log(populatedUser);

  return c.json(
    {
      success: true,
      data: populatedUser?.watchlist || [],
      hasNextPage,
    },
    { status: StatusCodes.OK }
  );
};

export default getContinueWatching;
