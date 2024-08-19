import type { ReactNode } from "react";

export default function AppContainer({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
