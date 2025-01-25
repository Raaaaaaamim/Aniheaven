import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "reply", "comment"],
    required: true,
  },
  message: { type: String, required: true }, // E.g., "Your comment got a like"
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },

  link: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Activity", activitySchema);
