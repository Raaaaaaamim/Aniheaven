import { Hono } from "hono";
import addToContinueWatching from "../controllers/animeControllers/addToContinueWatching.js";
import addToWatchlist from "../controllers/animeControllers/addToWatchlist.js";
import getContinueWatching from "../controllers/animeControllers/getContinueWatching.js";
import getWatchlist from "../controllers/animeControllers/getWatchlist.js";
import { Wrapper } from "../features/utils.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const anime = new Hono();

anime.post(
  "/continue-watching",
  Wrapper(protectedRoute),
  Wrapper(addToContinueWatching)
);
anime.get(
  "/continue-watching",
  Wrapper(protectedRoute),
  Wrapper(getContinueWatching)
);
anime.post("/watchlist", Wrapper(protectedRoute), Wrapper(addToWatchlist));
anime.get("/watchlist", Wrapper(protectedRoute), Wrapper(getWatchlist));

export default anime;
