import type { Context } from "hono";
import User from "../../models/user.js";
interface SignUpData {
  email: string;
  password: string;
  name: string;
  profilePicture: string;
  username: string;
}
const signUp = async (c: Context): Promise<Response> => {
  const { email, password, name, profilePicture, username }: SignUpData =
    await c.req.json();
  if (!email || !password || !name || !profilePicture || !username) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }
  // find if user exists

  const user = await User.findOne({ email });
  if (user) {
    return c.json(
      { success: false, message: "User already exists" },
      { status: 409 }
    );
  }
};

export default signUp;
