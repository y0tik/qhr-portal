import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import "./tailwind.css";
import { useCallback, useEffect, useRef } from "react";
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

const TopProgressBar = ({ delay = 500 }: { delay: number }) => {
  const { state } = useNavigation();
  const ref = useRef<LoadingBarRef>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loaderInit = () => {
      if (!ref.current) return;
      ref.current.continuousStart(0);
    };

    if (timer.current && state === "idle") {
      clearTimeout(timer.current);
      ref.current?.complete();
    }

    if (timer.current && state === "loading") {
      clearTimeout(timer.current);
      timer.current = setTimeout(loaderInit, delay);
    }

    return () => clearTimeout(timer.current ?? undefined);
  }, [state, delay]);

  return <TopLoadingBar color="#55286F" ref={ref} />;
};

export default function App() {
  return (
    <>
      <TopProgressBar delay={500} />
      <Outlet />
    </>
  );
}
