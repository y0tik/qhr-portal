import { Link, useLocation } from "@remix-run/react";
import type { ReactNode } from "react";
import { HeaderContainer, HeaderUserGroup } from "~/components/header";
import type { Moduleitem } from "~/utils/const";
import { cn } from "~/utils/utils";

export const ModuleContent = ({
  children,
  className,
}: { children: ReactNode; className?: string }) => {
  return <div className={cn(className, "flex-grow w-full")}>{children}</div>;
};

export const ModuleContainer = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const ModuleHeader = ({ menu }: { menu?: Moduleitem[] }) => {
  return (
    <ModuleHeaderWrapper>
      {menu ? <ModuleMenu menu={menu} /> : <div />}
    </ModuleHeaderWrapper>
  );
};

// Helper component to create headers for modules with the specified menu
export const ModuleHeaderWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <HeaderContainer>
      <div className="flex gap-3 items-center">{children}</div>
      <HeaderUserGroup />
    </HeaderContainer>
  );
};

export const ModuleMenu = ({ menu }: { menu: Moduleitem[] }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex gap-2">
      {menu.map((el) => (
        <Link
          key={el.to}
          to={el.to}
          data-active={
            el.activeType === "exact"
              ? pathname === el.to
              : pathname.startsWith(el.to)
          }
          className="px-2 py-1 rounded transition-colors cursor-pointer data-[active=true]:bg-primary/10 bg-primary-foreground data-[active]: text-sm"
        >
          {el.title}
        </Link>
      ))}
    </div>
  );
};
