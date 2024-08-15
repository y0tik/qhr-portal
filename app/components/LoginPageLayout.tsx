import type { PropsWithChildren } from "react";

export default function LoginPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      {children}
    </div>
  );
}
