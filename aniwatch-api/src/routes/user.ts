import { Hono } from "hono";
import getMyProfile from "../controllers/userControllers/getMyProfile.js";
import getUser from "../controllers/userControllers/getUser.js";
import login from "../controllers/userControllers/login.js";
import signUp from "../controllers/userControllers/signup.js";
import updateProfile from "../controllers/userControllers/updateProfile.js";
import updateUserEmail from "../controllers/userControllers/updateUserEmail.js";
import verifyEmail from "../controllers/userControllers/verifyEmail.js";
import { Wrapper } from "../features/utils.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const user = new Hono();

user.post("/signup", Wrapper(signUp));
user.post("/login", Wrapper(login));
user.get("/profile", Wrapper(protectedRoute), Wrapper(getMyProfile));
user.put("/profile", Wrapper(protectedRoute), Wrapper(updateProfile));
user.put("/email", Wrapper(protectedRoute), Wrapper(updateUserEmail));
user.post("/verify-email", Wrapper(protectedRoute), Wrapper(verifyEmail));
user.get("/:id", Wrapper(getUser));

export default user;
