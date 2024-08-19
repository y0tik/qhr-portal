import { AlertCircle } from "lucide-react";
import type React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";

export type AlertProp = { type: "error" | "success"; message: string };

export const ConfirmDialog = ({
  trigger,
  action,
  alert,
}: {
  trigger?: React.ReactNode;
  action: React.ReactNode;
  alert?: AlertProp;
}) => {
  const triggerComp = trigger ? (
    trigger
  ) : (
    <Button type="button" variant="destructive">
      Delete
    </Button>
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerComp}</AlertDialogTrigger>
      <AlertDialogContent>
        {alert?.message && (
          <Alert variant={alert.type === "error" ? "destructive" : "default"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{alert.type.toUpperCase()}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>{action}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
