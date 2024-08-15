import { AlertCircle } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function ErrorAlert({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
