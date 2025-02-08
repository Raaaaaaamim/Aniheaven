import type { Context } from "hono";
import { sendVerificationEmail, StatusCodes } from "../../features/utils.js";
import type { UserType } from "../../interfaces/user.js";
const verifyEmail = async (c: Context) => {
  const body = await c.req.json();
  if (!body) {
    return c.json(
      { success: false, message: "Missing required fields" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  const { vCode } = body;
  // check if email is verified
  const user: UserType = c.get("USER");
  if (user.emailVerified) {
    return c.json(
      { success: false, message: "Email already verified" },
      { status: StatusCodes.CONFLICT }
    );
  }
  // see if the code is valid
  if (Number.isNaN(vCode)) {
    return c.json(
      { success: false, message: "Verification code is not valid" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  // if Vcode exists then validate it
  if (vCode && user.emailVerificationToken) {
    const user: UserType = c.get("USER");
    if (!user.emailVerificationToken) {
      return c.json(
        { success: false, message: "Verification code not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }
    // check if the code has expired

    if (
      !user.emailVerificationToken ||
      !user.emailVerificationExpires ||
      user.emailVerificationExpires < new Date()
    ) {
      return c.json(
        { success: false, message: "Verification code expired or not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }
    // compare the codes
    const isMatch = Number(vCode) === Number(user.emailVerificationToken);
    if (!isMatch) {
      return c.json(
        { success: false, message: "Verification code didn't match " },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }
    // delete the token
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    user.emailVerified = true;
    await user.save();
    return c.json({ success: true, message: "Email verified" });
  } else {
    // only send verification code again if the previous one has expired
    if (
      user.emailVerificationExpires &&
      user.emailVerificationExpires > new Date()
    ) {
      return c.json(
        {
          success: false,
          message:
            "You can only request a new verification code once every 5 minutes",
        },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    // send verification code
    // create a 6 digit  verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = new Date(Date.now() + 1000 * 60 * 5);
    await user.save();
    const sent = await sendVerificationEmail(user.email, verificationToken);
    if (!sent) {
      return c.json(
        { success: false, message: "Failed to send verification email" },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    }
    return c.json({ success: true, message: "Verification email sent" });
  }
};

export default verifyEmail;
