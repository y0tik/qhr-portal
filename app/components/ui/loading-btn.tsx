import type { PropsWithChildren } from "react";
import { Button, type ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";
type LoadingButtonProps = ButtonProps &
  PropsWithChildren<{
    loading: boolean;
  }>;

const Spinner = () => {
  return (
    <div className="h-4 w-4 animate-spin rounded-full border-x-primary-foreground border-t-2" />
  );
};

export const LoadingButton = ({
  loading,
  children,
  size,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={loading}
      {...props}
      className={cn("gap-2", props.className)}
    >
      {loading && (
        <div className="">
          <Spinner />
        </div>
      )}
      {!(size === "icon" && loading) && children}
    </Button>
  );
};
