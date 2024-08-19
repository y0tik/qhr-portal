import type { LoaderFunctionArgs } from "@remix-run/node";
import { MockedDocumentCategoriesCard } from "~/components/cards/categories-card";
import { MockedCompanyOverviewCard } from "~/components/cards/cmp-overview-card";
import { MockedJobsCard } from "~/components/cards/jobs-card";
import { MockedLatestNewsCard } from "~/components/cards/news-card";
import { MockedAlumniTicketsCard } from "~/components/cards/TicketsCard";
import { requirePermission } from "~/services/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requirePermission(request, ["self"]);
  return null;
};

export default function AlumniOverviewPage() {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white lg:grid-cols-6">
      <div className="col-span-3 flex flex-col gap-4">
        <MockedCompanyOverviewCard />
        <MockedLatestNewsCard />
        <MockedAlumniTicketsCard />
      </div>
      <div className="col-span-3 flex flex-col gap-4">
        <MockedDocumentCategoriesCard />
        <MockedJobsCard />
      </div>
    </div>
  );
}
