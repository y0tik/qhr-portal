import { PropsWithChildren } from "react";
import { Button, ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";
type LoadingButtonProps = ButtonProps &
  PropsWithChildren<{
    loading: boolean;
  }>;

const Spinner = () => {
  return (
    <div className="animate-spin w-4 h-4 border-t-2 border-x-primary-foreground rounded-full"></div>
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
