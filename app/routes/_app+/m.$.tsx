import { ErrorDisplay } from "~/components/ErrorBoundary";

// for 404 that starts with /m, handle it here
// as a result we get to keep the sidebar,
// this prevent a drastic context change for user
// better ux

export default function Page() {
  return <ErrorDisplay />;
}
