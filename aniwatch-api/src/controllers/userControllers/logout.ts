import type { Context } from "hono";
import { deleteCookie } from "hono/cookie";

const logout = async (c: Context) => {
  deleteCookie(c, "token");
  return c.json({ success: true, message: "Logout successful" });
};

export default logout;
