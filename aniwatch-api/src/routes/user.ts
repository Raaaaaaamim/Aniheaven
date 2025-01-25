import { Hono } from "hono";
import signUp from "../controllers/userControllers/signup.js";

const user = new Hono();

user.post("/signup", signUp);

export default user;
