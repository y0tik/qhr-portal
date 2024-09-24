import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import TopLoadingBar, { type LoadingBarRef } from "react-top-loading-bar";
import { themeSessionResolver } from "./services/theme.server";
import "./tailwind.css";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { cn } from "./utils/utils";
export { ErrorDisplay as ErrorBoundary } from "./components/ErrorBoundary";

export async function loader({ request }: LoaderFunctionArgs) {
  const theme = await themeSessionResolver(request);
  return { theme: theme.getTheme() };
}


function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html
      lang="en"
      className={cn(
        "scrollbar-thin scrollbar-thumb-primary/80 scrollbar-track-primary-foreground h-32 overflow-y-auto",
        theme ?? "",
      )}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <TopProgressBar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html >
  );
}

const TopProgressBar = () => {
  const { state } = useNavigation();
  const ref = useRef<LoadingBarRef>(null);

  useEffect(() => {
    if (state === "idle") {
      ref.current?.complete();
    } else if (state === "loading") {
      ref.current?.continuousStart(0);
    }
  }, [state]);

  return <TopLoadingBar color="#55286F" ref={ref} />;
};

export default function AppWithTheme() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}
