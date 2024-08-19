import { Link, useNavigate, useRouteError } from "@remix-run/react";
import { AlertCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { extractErrorType } from "~/utils/utils";

const NotFoundMessage = () => (
  <>
    <p className="mb-1 font-bold text-3xl text-gray-900 tracking-tight md:text-xl dark:text-white">
      Something&apos;s missing.
    </p>
    <p className="font-light text-gray-500 text-lg dark:text-gray-400">
      Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on
      the home page.
    </p>
  </>
);

export function ErrorDisplay() {
  const error = extractErrorType(useRouteError());
  const navigate = useNavigate();
  const errorNode =
    error.status === "404" ? <NotFoundMessage /> : error.message;

  return (
    <div className="mx-auto mt-10 grid w-full md:w-2/3 lg:w-1/2 gap-6 sm:px-6 md:p-10">
      <div className="fixed z-[-1] h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="p-10 text-center md:text-left mt-12 relative border border-red-200 bg-red-50 sm:rounded-lg">
        <AlertCircle className="p-3 -top-10 left-1/2 -translate-x-1/2 absolute w-20 h-20 rounded-full bg-red-50 shadow-inner border border-red-100 text-red-500" />
        <div className="pt-5 md:pt-0 text-5xl md:text-6xl font-bold text-red-500">
          {error.status}
        </div>
        <div className="mt-5 md:mt-6 text-lg">{errorNode}</div>
        {error.detailed_description && (
          <div className="mt-2 text-sm text-red-700">
            ErrorStack : {error.detailed_description}
          </div>
        )}
      </div>
      <div className="text-center mt-2 px-6 md:mt-6 md:px-0">
        <h2 className="font-semibold text-2xl">Need Assistance ?</h2>
        <p className="mt-1 text-muted-foreground">
          If you have any questions or need help, please feel free to reach out
          to us.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link to="/" replace>
            Back to Homepage
          </Link>
        </Button>
        <Button onClick={() => navigate(-1)} variant="secondary">
          Go Back
        </Button>
        <Button asChild variant="secondary">
          <Link to="/support">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
