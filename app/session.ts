import {
  createCookieSessionStorage,
  createFileSessionStorage,
} from '@remix-run/node';

const sessionStore = createFileSessionStorage({
  cookie: {
    name: '__session',
    secrets: ['super-secret-secret'],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
});
