import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ArrowUpRight, EyeIcon, EyeOffIcon, PlusCircle } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { requirePermission } from "~/services/permission.server";
import { PROJECT_NAME } from "~/utils/const";
import { mockData, runWithProbability } from "~/utils/mockData.server";
import type { EntityJob } from "~/utils/types";
import { cn, relativeTimeFromNow } from "~/utils/utils";

// TODO: Add proper meta data
export const meta: MetaFunction = () => [
  { title: `All Jobs : ${PROJECT_NAME}` },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requirePermission(request, ["m:jobs:all"]);

  const data = runWithProbability(
    100,
    () => mockData.jobs,
    new Error(
      "Please ignore, this is a mock error message. Should be hit 10 percent of the time, please refresh the page",
    ),
  );

  return json({ jobs: data, metrics: [] });
};

export default function Page() {
  const { jobs } = useLoaderData<typeof loader>();
  return (
    <div className="h-full flex flex-col gap-4 pb-6">
      <JobPageHeader />
      <div className="px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
        {jobs.map((j) => (
          <JobCardItem key={j.id} job={j} />
        ))}
      </div>
    </div>
  );
}

const JobPageHeader = () => {
  return (
    <div className="px-6 py-4 flex justify-between items-center bg-secondary">
      <Button size="sm">
        <span>New Job</span>
      </Button>
      <div className="text-muted text-sm">
        <div className="font-medium">All</div>
        <div className="opacity-60">
          <div className="font-normal">
            <div className="opacity-60">
              <div className="opacity-60">Filters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobCardItem = ({ job }: { job: EntityJob }) => {
  return (
    <div className="flex flex-col rounded-lg cursor-pointer border duration-300 group p-5 pb-0 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">

      <div>
        <div className="flex items-start justify-between">
          <div className="font-semibold">{job.jobDescription.title}</div>
          <Badge className="capitalize font-medium whitespace-nowrap">
            <span>{job.jobDescription.jobType}</span>
          </Badge>
        </div>
        <div className="text-2sm text-muted-foreground mt-1.5 flex">
          <div className="first:pl-0">{job.jobDescription.department}</div>
          <div className="ml-2 pl-2 border-l">{job.jobDescription.area}</div>
        </div>
      </div>

      <div className="pt-5 *:py-0.5 *:pl-2 flex gap-2 text-2sm divide-x-2">
        <div className="first:pl-0">
          {`${job.jobDescription.salary.min} - ${job.jobDescription.salary.max} LPA`}
        </div>
        <div>
          {`${job.jobDescription.experience.min} - ${job.jobDescription.experience.max} Years`}
        </div>
        <div>
          {`${job.jobDescription.skills.length} Skills`}
        </div>
      </div>

      <div className="flex-grow" />
      <div className="space-x-6 mt-4 border-t flex items-center justify-between rounded-b-lg bg-secondary px-5 py-4 -mx-5">
        <div className="text-muted-foreground">
          <div className="text-xs opacity-80">Updated {relativeTimeFromNow(job.created_on)} </div>
          <div className="text-2sm mt-2">
            By
            <span className="text-primary font-semibold"> {job.created_by_name}</span>
          </div>
        </div>
        <div className="flex">
          <Badge variant="ghost" className={cn("px-3 gap-1", job.setting.sharable ? "text-primary" : "text-destructive")}>
            {job.setting.sharable ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
            {job.setting.sharable ? "Published" : "Unpublished"}
          </Badge>
          <Button size="sm-icon" variant="outline" className="">
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </div>

    </div>
  );
};
