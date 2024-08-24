import { useLocation } from "@remix-run/react";
import { extractModuleNameFromURL, uppercase } from "~/utils/utils";

export function EmptyModule() {
  const { pathname } = useLocation();
  const moduleName = uppercase(extractModuleNameFromURL(pathname));

  return (
    <div className="border-dashed rounded-lg border-2 h-full p-4">
      <div className="h-full grid place-items-center">
        <div>
          <div className="text-xl mb-2 -mt-24 text-muted-foreground">
            {moduleName} Module
          </div>
          <div className="text-primary text-4xl">Comming Soon</div>
        </div>
      </div>
    </div>
  );
}
