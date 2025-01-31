import type { User } from "../types/user.js";

type CacheVariables = {
  CACHE_CONFIG: {
    key: string;
    duration: number;
  };
  USER: User;
};

export type AniwatchAPIVariables = {} & CacheVariables;
