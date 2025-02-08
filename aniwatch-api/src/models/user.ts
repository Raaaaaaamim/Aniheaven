import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    banner: {
      type: String,
      default: "https://w.wallhaven.cc/full/4d/wallhaven-4dk2ej.png",
      enum: [
        "https://w.wallhaven.cc/full/4d/wallhaven-4dk2ej.png",
        "https://w.wallhaven.cc/full/49/wallhaven-49d1dd.jpg",
        "https://w.wallhaven.cc/full/yx/wallhaven-yx3kok.jpg",
        "https://w.wallhaven.cc/full/vm/wallhaven-vm555m.jpg",
        "https://w.wallhaven.cc/full/vm/wallhaven-vmj3kl.jpg",
        "https://w.wallhaven.cc/full/m3/wallhaven-m35ze1.png",
        "https://w.wallhaven.cc/full/mp/wallhaven-mpk791.jpg",
      ],
    },
    profilePicture: { type: String, default: "default-profile.png" },
    name: { type: String, required: [true, "Name must be present"] },
    achievements: {
      eternalFlame: { type: Boolean, default: false },
      theChosenOne: { type: Boolean, default: false },

      beyondHuman: { type: Boolean, default: false },
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
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
