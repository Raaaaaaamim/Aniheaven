import type { Document, Types } from "mongoose";

export interface continueWatchingType extends Document {
  _id: Types.ObjectId;
  HiAnimeId: string;
  author: Types.ObjectId;
  name: string;
  poster: string;
  type?: string;
  duration?: number;
  jname: string;
  episodes: {
    sub: number;
    dub: number;
  };
  epId: string;
  startFrom?: number;
  epNumber: number;
}
