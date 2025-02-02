import { Hono } from "hono";
import addToContinueWatching from "../controllers/animeControllers/addToContinueWatching.js";
import { Wrapper } from "../features/utils.js";

const anime = new Hono();

anime.post("/continue-watching", Wrapper(addToContinueWatching));

export default anime;
