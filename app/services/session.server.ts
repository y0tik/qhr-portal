import { createCookieSessionStorage } from "@remix-run/node";
import { env } from "~/env.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [env.ALUMNUX_COOKIE_SECRET],
    // secure: process.env.NODE_ENV === "production",
    secure: false,
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage;
