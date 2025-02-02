import mongoose from "mongoose";

const continueWatchingSchema: mongoose.Schema = new mongoose.Schema({
  HiAnimeId: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  poster: { type: String, required: true },
  duration: { type: String },
  jname: { type: String, required: true },
  type: { type: String },
  rating: { type: String },
  link: { type: String, required: true },
  episodes: {
    sub: { type: Number, required: true },
    dub: { type: Number, required: true },
  },
  startFrom: { type: Number },
});

export default mongoose.model("ContinueWatching", continueWatchingSchema);
