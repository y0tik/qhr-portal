import { MockedLatestNewsCard } from "~/components/alumni/cards/NewsCard";
import { MockedCompanyOverviewCard } from "~/components/alumni/cards/CompanyOverviewCard";
import { MockedAlumniTicketsCard } from "~/components/alumni/cards/TicketsCard";
import { MockedJobsCard } from "~/components/alumni/cards/JobsCard";
import { MockedDocumentCategoriesCard } from "~/components/alumni/cards/CategoriesCard";

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
