import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },

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
        ref: "Anime",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
