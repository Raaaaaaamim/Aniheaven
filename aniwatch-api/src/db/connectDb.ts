import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/aniheaven");
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};
