import type mongoose from "mongoose";

export interface continueWatchingType {
  _id: mongoose.Types.ObjectId;
  HiAnimeId: string;
  author: mongoose.Types.ObjectId;
  name: string;
  poster: string;
  type?: string;
  duration?: number;
  jname: string;
  episodes: {
    sub: number;
    dub: number;
  };
  startFrom?: number;
  link: string;
  epNumber: number;
}
