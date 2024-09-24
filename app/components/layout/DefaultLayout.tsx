import type { ReactNode } from "react";
import useLocalStorageState from "~/hooks/useLocalStorageState";
import { PERFS_SIDEBAR } from "~/utils/const";
import { Sidebar } from "../Sidebar";
import { cn } from "~/utils/utils";

export const DefaultLayout = (props: { children: ReactNode }) => {
  const [pinned, setPinned] = useLocalStorageState<boolean>(PERFS_SIDEBAR, false);
  return (
    <div className="min-h-screen flex flex-row">
      <Sidebar pinned={pinned} onPinned={() => setPinned(p => !p)} />
      <MainContainer pinned={pinned}>{props.children}</MainContainer>
    </div>
  );
};

const MainContainer = ({ children, pinned }: { children: ReactNode, pinned: boolean | undefined }) => {
  return <div className={cn(
    "flex-grow flex flex-col",
  )} >{children}</div>;
};
