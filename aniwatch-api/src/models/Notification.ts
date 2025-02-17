import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["like", "comment", "follow", "mention", "system", "custom"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    url: {
      type: String, // Optional: Can be used to redirect the user
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("Notification", NotificationSchema);
