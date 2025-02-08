import mongoose from "mongoose";

const watchlistAnimeSchema: mongoose.Schema = new mongoose.Schema({
  HiAnimeId: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  poster: { type: String, required: true },
  jname: { type: String, required: true },
  type: { type: String },
  episodes: {
    sub: { type: Number, required: true },
    dub: { type: Number, required: true },
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("WatchlistAnime", watchlistAnimeSchema);
