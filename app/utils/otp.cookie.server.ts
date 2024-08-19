import { createCookie } from "@remix-run/node";

// verifyOTP
export const verifyOTP = createCookie("verifyOTP", {
  maxAge: 60 * 5, // expires in 5 minutes
  sameSite: "strict",
});
