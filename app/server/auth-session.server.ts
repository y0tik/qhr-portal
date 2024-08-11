import { createCookieSessionStorage, redirect } from "@remix-run/node";
import type { Role } from "~/types";
import { createAPIForRequest } from "./api.server";
import { type Permission, hasPermissions } from "./permission.server";

export type AuthSessionData = {
  uname: string;
  email: string;
  atoken: string;
  id: number;
  cid: number;
  role: Role;
};

type AuthSessionFlashData = {
  message: {
    type: "error" | "info";
    message: string;
  };
};

const COOKIE_SECRECT =
  process.env.ALUMNI_CLIENT_COOKIE_SECRET ?? "super-secret-secret";

export const sessionStore = createCookieSessionStorage<
  AuthSessionData,
  AuthSessionFlashData
>({
  cookie: {
    name: "__session",
    secrets: [COOKIE_SECRECT],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 1, // 1 day
  },
});

const getSessionFromRequest = async (req: Request) =>
  sessionStore.getSession(req.headers.get("Cookie"));

export const requirePermission = async (
  req: Request,
  permissions?: Array<Permission>,
) => {
  const session = await getSessionFromRequest(req);
  const { uname, email, atoken, id, role, cid } = session.data;
  if (!uname || !email || !atoken || !id || !role || !cid) {
    throw redirect(`/login?code=1ZVGUE&callbackUrl=${req.url}`);
  }
  if (permissions && !hasPermissions(role, permissions)) {
    throw new Error("E#20BPL4 You don't have permission to view this resource");
  }
  return {
    api: createAPIForRequest(atoken, req),
    user: { uname, email, atoken, id, role, cid },
    session,
  };
};

export const setAuthSession = async (
  req: Request,
  { uname, email, atoken, id, role, cid }: AuthSessionData,
) => {
  const session = await getSessionFromRequest(req);
  session.set("uname", uname);
  session.set("email", email);
  session.set("atoken", atoken);
  session.set("id", id);
  session.set("role", role);
  session.set("cid", cid);
  return {
    headers: {
      "Set-Cookie": await sessionStore.commitSession(session),
    },
  };
};

export const getAuthSession = async (req: Request) => {
  const session = await getSessionFromRequest(req);
  if (
    session.has("uname") &&
    session.has("email") &&
    session.has("atoken") &&
    session.has("id") &&
    session.has("role") &&
    session.has("cid")
  ) {
    return session;
  }
  return null;
};
