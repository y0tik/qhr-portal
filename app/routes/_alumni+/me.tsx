import { MockedLatestNewsCard } from "~/components/feature/alumni/news-card";
import { MockedCompanyOverviewCard } from "~/components/feature/alumni/cmp-overview-card";
import { MockedAlumniTicketsCard } from "~/components/feature/_common/tickets-card";
import { MockedJobsCard } from "~/components/feature/alumni/jobs-card";
import { MockedDocumentCategoriesCard } from "~/components/feature/alumni/categories-card";

export default function AlumniOverviewPage() {
  return (
    <div className="flex-1 container mx-auto py-4 p-0 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 bg-white">
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
    </div>
  );
}
