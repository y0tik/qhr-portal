import { createCookie, redirect } from "@remix-run/node";

// verifyOTP
export const verifyOTP = createCookie("verifyOTP", {
  maxAge: 60 * 5, // expires in 5 minutes
  sameSite: "strict",
});

export async function useVerifyOTP(request: Request, redirectTo = "/login") {
  const cookieHeader = request.headers.get("Cookie");
  const cookie: { username: string } | null =
    await verifyOTP.parse(cookieHeader);
  if (!cookie?.username) {
    throw redirect(redirectTo);
  }
  return cookie;
}
