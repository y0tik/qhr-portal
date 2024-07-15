import { useRouteError } from "@remix-run/react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export function ErrorBoundary() {
  const error = useRouteError();
  // can log to posthog

  console.log(error);
  return (
    <div className="flex justify-center flex-1 bg-destructive/5">
      <div className="mt-24">
        <Alert variant="destructive" className="p-10">
          <AlertCircle className="h-8 w-8" />
          <AlertTitle className="text-xl">Oops...</AlertTitle>
          <AlertDescription className="text-lg">
            Something went wrong. Please try again later.
          </AlertDescription>
        </Alert>
        <div className="mt-8 text-muted-foreground text-center">
          <h2>Need Assistance?</h2>
          <p>
            If you have any questions or need help, <br /> please feel free to
            reach out to us.
          </p>
        </div>
      </div>
    </div>
  );
}
