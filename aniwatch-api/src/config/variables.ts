import type { User } from "../interfaces/user.js";

type CacheVariables = {
  CACHE_CONFIG: {
    key: string;
    duration: number;
  };
  USER: User;
  USER_ID: string | null;
};

export type AniwatchAPIVariables = {} & CacheVariables;
