import { MockedAlumniTicketsCard } from "~/components/feature/_common/tickets-card";
import { MockedDocumentCategoriesCard } from "~/components/feature/alumni/categories-card";
import { MockedCompanyOverviewCard } from "~/components/feature/alumni/cmp-overview-card";
import { MockedJobsCard } from "~/components/feature/alumni/jobs-card";
import { MockedLatestNewsCard } from "~/components/feature/alumni/news-card";

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
