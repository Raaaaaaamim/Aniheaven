import type { Context, Next } from "hono";

export const Wrapper =
  (handler: (c: Context, next?: Next) => Promise<Response | void>) =>
  async (c: Context, next: Next) => {
    try {
      return await handler(c, next);
    } catch (error: any) {
      console.log("Caught by wrapper:", error.message);
      throw error; // Pass the error to onError
    }
  };
