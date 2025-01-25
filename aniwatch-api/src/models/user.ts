import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true, immutable: true },

    profilePicture: { type: String, default: "default-profile.png" },
    name: { type: String, default: "" },
    achievements: {
      eternalFlame: { type: Boolean, default: false },
      theChosenOne: { type: Boolean, default: false },

      beyondHuman: { type: Boolean, default: false },
    },
    totalWatchTime: { type: Number, default: 0 },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: {
      type: Date,
      default: Date.now() + 7 * 24 * 60 * 60 * 1000,
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
        ref: "Anime",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
