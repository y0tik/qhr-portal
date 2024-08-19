import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import "./tailwind.css";
import { useEffect, useRef } from "react";
import TopLoadingBar, { type LoadingBarRef } from "react-top-loading-bar";
import { ErrorDisplay } from "./components/ErrorBoundary";

export function ErrorBoundary() {
  return <ErrorDisplay />;
  // return (
  // <>
  //   <html lang="en" className="h-full">
  //     <head>
  //       <meta charSet="utf-8" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1" />
  //       <Meta />
  //       <Links />
  //     </head>
  //     <body>
  //       <ErrorDisplay />
  //       <Scripts />
  //     </body>
  //   </html>
  // </>
  // );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

const TopProgressBar = () => {
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
      <TopProgressBar />
      <Outlet />
    </>
  );
}
