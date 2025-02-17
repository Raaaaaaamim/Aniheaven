import type { Document, ObjectId } from "mongoose";

export interface UserType extends Document {
  _id: ObjectId;
  password: string;
  username: string;
  email: string;
  name: string;
  bio: string;
  profilePicture: string;
  emailVerified: boolean;
  emailVerificationToken: number | undefined;
  emailVerificationExpires: Date | undefined;
  activity: ObjectId[];
  continueWatching: ObjectId[];
  totalWatchTime: number;
  achievements: {
    eternalFlame: boolean;
    theChosenOne: boolean;
    beyondHuman: boolean;
  };
  watchlist: ObjectId[];
  settings: {
    autoPlay: boolean;
    autoNext: boolean;
    autoSkipIntro: boolean;
    enableDub: boolean;
    titleLanguage: string;
    defaultServer: string;
    preferredQuality: string;
  };
  notifications: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
