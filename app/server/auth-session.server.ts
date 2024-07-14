import { createCookieSessionStorage, redirect } from "@remix-run/node";

type AuthSessionData = {
  username: string;
  email: string;
  access_token: string;
};

type AuthSessionFlashData = {
  error: string;
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

export const requireAuth = async (req: Request) => {
  const { username, email, access_token } = (await getSessionFromRequest(req))
    .data;
  if (!username || !email || !access_token) {
    throw redirect("/login?code=1ZVGUE");
  }
  return { username, email, access_token };
};

export const setAuthSession = async (
  req: Request,
  { username, email, access_token }: AuthSessionData
) => {
  const session = await getSessionFromRequest(req);
  session.set("username", username);
  session.set("email", email);
  session.set("access_token", access_token);
  return {
    headers: {
      "Set-Cookie": await sessionStore.commitSession(session),
    },
  };
};

export const hasValidAuthSession = async (req: Request) => {
  const session = await getSessionFromRequest(req);
  if (
    session.has("username") &&
    session.has("email") &&
    session.has("access_token")
  ) {
    return true;
  }
  return false;
};
