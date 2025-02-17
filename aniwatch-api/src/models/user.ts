import mongoose from "mongoose";
import type { UserType } from "../interfaces/user.js";
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    banner: {
      type: String,
      default: "https://w.wallhaven.cc/full/4d/wallhaven-4dk2ej.png",
    },
    profilePicture: { type: String, default: "default-profile.png" },
    name: { type: String, required: [true, "Name must be present"] },
    achievements: {
      angrish: { type: Boolean, default: false },
      chosenOne: { type: Boolean, default: false },
      beyondHuman: { type: Boolean, default: false },
      new: { type: Boolean, default: true },
    },
    totalWatchTime: { type: Number, default: 0 },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: Number },
    emailVerificationExpires: {
      type: Date,
      default: undefined,
    },

    activity: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
    continueWatching: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ContinueWatching",
        default: [],
      },
    ],
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },

    watchlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WatchlistAnime",
        default: [],
      },
    ],
    settings: {
      autoPlay: { type: Boolean, default: false },
      autoNext: { type: Boolean, default: false },
      autoSkipIntro: { type: Boolean, default: false },
      enableDub: { type: Boolean, default: false },
      titleLanguage: { type: String, default: "English" },
      defaultServer: { type: String, default: "default" },
      preferredQuality: { type: String, default: "1080p" },
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model<UserType>("User", userSchema);

export default User;
