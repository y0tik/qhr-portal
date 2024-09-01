import { Outlet, useRouteError } from "@remix-run/react";
import {
  ModuleContainer,
  ModuleContent,
  ModuleHeader,
} from "~/components/module";
import { MODULE_MENU_JOBS } from "~/utils/const";

export default function Page() {
  return (
    <ModuleContainer>
      <ModuleHeader menu={MODULE_MENU_JOBS} />
      <ModuleContent>
        <Outlet />
      </ModuleContent>
    </ModuleContainer>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = "An unexpected error occurred when fetching users";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <ModuleContainer>
      <ModuleHeader menu={MODULE_MENU_JOBS} />
      <ModuleContent>
        <div className="border-dashed rounded-lg border border-destructive h-full p-4 bg-red-100">
          <div className="h-full grid place-items-center">
            <div>
              <div className="text-xl -mt-24 text-muted-foreground">
                Jobs Module
              </div>
              <div className="text-red-500 text-3xl mt-1 mb-5 font-semibold -mx-0.5">
                Something went wrong, please try again later
              </div>
              <div className="max-w-lg text-balance">
                <b>Details :</b>
                <br />
                {errorMessage}
              </div>
            </div>
          </div>
        </div>
      </ModuleContent>
    </ModuleContainer>
  );
}
