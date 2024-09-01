import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { requirePermission } from "~/services/permission.server";
import { PROJECT_NAME } from "~/utils/const";
import { mockData, runWithProbability } from "~/utils/mockData.server";
import type { EntityJob } from "~/utils/types";

// TODO: Add proper meta data
export const meta: MetaFunction = () => [
  { title: `All Jobs : ${PROJECT_NAME}` },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requirePermission(request, ["m:jobs:all"]);

  const data = runWithProbability(
    90,
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
    <div className="h-full flex flex-col px-6 py-4">
      <div className="px-6 py-8 flex justify-between items-center bg-primary rounded-lg">
        <div className="flex w-full items-center gap-2 justify-between">
          <div className="space-y-3">
            <Button variant="secondary" size="xs">
              <PlusCircle className="size-4" />
              <span>New Job</span>
            </Button>
          </div>
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
      </div>
      <div className="pt-4">
        {jobs.map((j) => (
          <JobCardItem key={j.id} job={j} />
        ))}
      </div>
    </div>
  );
}

const JobCardItem = ({ job }: { job: EntityJob }) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{job.jobDescription.title}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {job.companyInfo.location}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {job.jobDescription.department}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {job.jobDescription.area}
        </div>
      </div>
      <div>
        <div className="font-semibold text-sm text-slate-500 dark:text-slate-400">
          {job.jobDescription.salary.min} - {job.jobDescription.salary.max}
        </div>
        <div>Experience</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {job.expRequired.map((e) => (
            <div
              key={e.blockId}
              className="text-xs text-slate-500 dark:text-slate-400"
            >
              {e.title}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="font-semibold text-sm text-slate-500 dark:text-slate-400">
          Skills
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {job.jobDescription.skills}
        </div>
      </div>
    </div>
  );
};
