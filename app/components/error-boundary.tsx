import { useNavigate, useRouteError } from "@remix-run/react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui//alert";
import { Button } from "~/components/ui//button";

export function ErrorBoundary() {
  const error: unknown = useRouteError();
  const navigate = useNavigate();
  let errMessage = "Something went wrong. Please try again later.";
  if (error instanceof Error) {
    if (error.message.includes("E#20BPL4")) {
      errMessage = error.message.replace("E#20BPL4", "");
    }
  }
  // can log to posthog
  return (
    <div className="flex flex-1 justify-center bg-destructive/5">
      <div className="mt-24">
        <Alert variant="destructive" className="p-10">
          <AlertCircle className="h-8 w-8" />
          <AlertTitle className="text-xl">Oops...</AlertTitle>
          <AlertDescription className="text-lg">{errMessage}</AlertDescription>
        </Alert>
        <div className="mt-8 text-center text-muted-foreground">
          <h2>Need Assistance?</h2>
          <p>
            If you have any questions or need help, <br /> please feel free to
            reach out to us.
          </p>
          <div className="my-4" />
          <Button variant="link" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
