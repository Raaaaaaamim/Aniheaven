import type mongoose from "mongoose";

export interface UserType {
  _id: mongoose.Types.ObjectId;
  password: string;
  username: string;
  email: string;
  name: string;
  bio: string;
  profilePicture: string;
  emailVerified: boolean;
  emailVerificationToken: number | undefined;
  emailVerificationExpires: Date | undefined;
  activity: mongoose.Types.ObjectId[];
  continueWatching: mongoose.Types.ObjectId[];
  totalWatchTime: number;
  achievements: {
    eternalFlame: boolean;
    theChosenOne: boolean;
    beyondHuman: boolean;
  };
  watchlist: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  save: () => Promise<UserType>;
}
