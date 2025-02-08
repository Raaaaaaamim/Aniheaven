import type mongoose from "mongoose";

export interface watchlistAnimeType {
  _id: mongoose.Types.ObjectId;
  HiAnimeId: string;
  name: string;
  poster: string;
  jname: string;
  type: string;
  episodes: {
    sub: number;
    dub: number;
  };
  author: mongoose.Types.ObjectId;
}
