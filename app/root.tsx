import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import "./tailwind.css";
export { ErrorBoundary } from "./components/error-boundary";
import { useEffect, useRef } from "react";
import TopLoadingBar, { type LoadingBarRef } from "react-top-loading-bar";
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen flex-col">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const LoadingBar = () => {
  const { state } = useNavigation();
  const ref = useRef<LoadingBarRef>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (state === "idle") ref.current.complete();
    else ref.current.continuousStart(0);
  }, [state]);
  return <TopLoadingBar color="#00214d" ref={ref} />;
};

export default function App() {
  return (
    <>
      <LoadingBar />
      <Outlet />
    </>
  );
}
