import type { User } from "../interfaces/user.js";

type CacheVariables = {
  CACHE_CONFIG: {
    key: string;
    duration: number;
  };
  USER: User;
};

export type AniwatchAPIVariables = {} & CacheVariables;
