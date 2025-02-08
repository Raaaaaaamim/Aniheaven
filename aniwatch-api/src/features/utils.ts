import type { Context, Next } from "hono";
import { setCookie } from "hono/cookie";
import jwt from "jsonwebtoken";
import type mongoose from "mongoose";
import nodemailer from "nodemailer";
import { getVerificationEmailTemplate } from "./getVerificationEmailTemplate.js";

export const Wrapper =
  (handler: (c: Context, next: Next) => Promise<Response | void>) =>
  async (c: Context, next: Next) => {
    try {
      return await handler(c, next);
    } catch (error: any) {
      throw error; // Pass the error to onError
    }
  };

export enum StatusCodes {
  // Success Codes
  OK = 200, // Standard response for successful HTTP requests
  CREATED = 201, // Indicates that a resource has been successfully created
  NO_CONTENT = 204, // Indicates that the request was successful but no content is returned
  CONFLICT = 409, // The request could not be completed due to a conflict with the current state of the resource
  // Client Error Codes
  BAD_REQUEST = 400, // The request cannot be fulfilled due to bad syntax or missing information
  UNAUTHORIZED = 401, // Authentication is required and has failed or not provided
  FORBIDDEN = 403, // The server understands the request but refuses to authorize it
  NOT_FOUND = 404, // The requested resource could not be found

  // Server Error Codes
  INTERNAL_SERVER_ERROR = 500, // A generic error message when the server encounters an unexpected condition
  NOT_IMPLEMENTED = 501, // The server does not recognize the request method or lacks the ability to fulfill it
  BAD_GATEWAY = 502, // The server received an invalid response from the upstream server
  SERVICE_UNAVAILABLE = 503, // The server is currently unavailable (e.g., overloaded or down for maintenance)
}

export const generateTokenAndSendCookie = (
  c: Context,
  id: mongoose.Types.ObjectId
): void => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "15d",
  });

  setCookie(c, "token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only use secure in production
    sameSite: "lax", // Changed from 'none' to 'lax' for better compatibility
    path: "/",
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
  });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  // Add these for better delivery
  tls: {
    rejectUnauthorized: false,
  },
  pool: true, // Use pooled connections
  maxConnections: 5,
});
export const sendVerificationEmail = async (
  email: string,
  code: number
): Promise<boolean> => {
  transporter.verify(function (error: any) {
    if (error) {
      console.log("SMTP connection error:", error);
    } else {
      console.log("SMTP server is ready to take our messages");
    }
  });

  try {
    await transporter.sendMail({
      from: `"Aniheaven" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify Your Aniheaven Account",
      html: getVerificationEmailTemplate(code),
      headers: {
        "X-Priority": "1", // High priority
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    });
    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
};

export function checkPasswordStrength(password: string): string[] {
  const minLength = 8;
  const feedback: string[] = [];

  if (password.length < minLength) {
    feedback.push(`Password must be at least ${minLength} characters long.`);
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    feedback.push("Password must contain at least one lowercase letter.");
  }
  if (!/\d/.test(password)) {
    feedback.push("Password must contain at least one number.");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push("Password must contain at least one special character.");
  }

  return feedback;
}
export function validateEmail(email: string): string[] {
  const feedback: string[] = [];
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    feedback.push("Email is required.");
  } else if (!emailRegex.test(email)) {
    feedback.push("Invalid email format.");
  }

  return feedback;
}
