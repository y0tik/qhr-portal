import { Link } from "@remix-run/react";
import type { ReactNode } from "react";
import { HeaderContainer, HeaderUserGroup } from "~/components/header";
import type { Moduleitem } from "~/utils/const";

export const ModuleContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex-grow px-4 py-4 w-full">{children}</div>;
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
  return (
    <div className="flex gap-2">
      {menu.map((el) => (
        <Link
          key={el.to}
          to={el.to}
          className="px-2 py-1 rounded text-white hover:bg-white/20 transition-colors cursor-pointer data-[active]:bg-purple/10 data-[active]:font-semibold data-[active]:text-purple data-[active]:hover:bg-white/20 text-sm"
        >
          {el.title}
        </Link>
      ))}
    </div>
  );
};
