import { Outlet } from "@remix-run/react";
import {
  ModuleContainer,
  ModuleContent,
  ModuleHeader,
} from "~/components/module";
import { MODULE_MENU_ALUMNUX } from "~/utils/const";

export default function Page() {
  return (
    <ModuleContainer>
      <ModuleHeader menu={MODULE_MENU_ALUMNUX} />
      <ModuleContent>
        <Outlet />
      </ModuleContent>
    </ModuleContainer>
  );
}
