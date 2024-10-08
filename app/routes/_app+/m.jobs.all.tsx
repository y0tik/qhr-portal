import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  ArrowUpRight,
  EyeIcon,
  EyeOffIcon,
  FilterIcon,
  SortAscIcon,
} from "lucide-react";
import { AreaChart, Area, Tooltip, XAxis } from "recharts";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ChartContainer, type ChartConfig } from "~/components/ui/chart";
import { Input } from "~/components/ui/input";
import { requirePermission } from "~/services/permission.server";
import { JOBS_CREATE, PROJECT_NAME } from "~/utils/const";
import { mockData, runWithProbability } from "~/utils/mockData.server";
import type { EntityJob } from "~/utils/types";
import { cn, relativeTimeFromNow } from "~/utils/utils";
import { PlusIcon } from "../../components/Icons";

// TODO: Add proper meta data
export const meta: MetaFunction = () => [
  { title: `All Jobs : ${PROJECT_NAME}` },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requirePermission(request, ["m:jobs:all"]);

  const data = runWithProbability(
    100,
    () => mockData.jobs.list,
    new Error(
      "Please ignore, this is a mock error message. Should be hit 10 percent of the time, please refresh the page",
    ),
  );

  return json({ jobs: data, metrics: mockData.jobs.weeklyJobCountStats() });
};

export default function Page() {
  const { jobs } = useLoaderData<typeof loader>();
  const jobsList = jobs.map((j) => <JobCardItem key={j.id} job={j} />);

  return (
    <div className="flex flex-col isolate gap-5 pb-6">
      <JobPageHeader />
      <div className="px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
        {jobsList}
      </div>
    </div>
  );
}

const chartConfig = {
  Referral: {
    label: "Referral",
    color: "#2563eb",
  },
  Consultant: {
    label: "Consultant",
    color: "#60a5fa",
  },
  Portal: {
    label: "Portal",
    color: "#65a5fa",
  },
} satisfies ChartConfig;

const ChartJobsCountByTypeHistorical = () => {
  const { metrics } = useLoaderData<typeof loader>();

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        data={metrics}
        accessibilityLayer
        margin={{ top: 40, bottom: 15 }}
      >
        <defs>
          <linearGradient id="color01" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color02" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color03" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff6f61" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="name" hide />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Portal"
          stroke="#8884d8"
          fillOpacity={0.5}
          fill="url(#color01)"
        />
        <Area
          type="monotone"
          dataKey="Consultant"
          stroke="#82ca9d"
          fillOpacity={0.5}
          fill="url(#color02)"
        />
        <Area
          type="monotone"
          dataKey="Referral"
          stroke="#ff6f61"
          fillOpacity={0.5}
          fill="url(#color03)"
        />
      </AreaChart>
    </ChartContainer>
  );
};

const JobPageHeader = () => {
  return (
    <div className="h-32 shadow-sm z-[999] border-b sticky top-0 flex items-center bg-white">
      <div className="h-full flex flex-col justify-center border-r px-6 w-5/12 bg-secondary/30">
        <div>
          <Button size="sm" asChild>
            <Link to={JOBS_CREATE}>
              <PlusIcon className="size-4" />
              <span>New Job</span>
            </Link>
          </Button>
        </div>
        <div className="flex mt-3 gap-3">
          <Input variant="sm" className="max-w-sm" placeholder="Search..." />
          <Button size="sm" variant="outline">
            <SortAscIcon className="size-3" />
            <span>Sort</span>
          </Button>
          <Button size="sm" variant="outline">
            <FilterIcon className="size-3" />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      <div className="h-full w-7/12 relative">
        <ChartJobsCountByTypeHistorical />
      </div>
    </div>
  );
};

const JobCardItem = ({ job }: { job: EntityJob }) => {
  return (
    <div className="flex flex-col rounded-lg border hover:border-primary/20 ease-out group p-5 pb-0 transition-shadow hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
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
        <div>{`${job.jobDescription.skills.length} Skills`}</div>
      </div>

      <div className="flex-grow" />
      <div className="space-x-6 mt-4 border-t flex items-center justify-between rounded-b-lg bg-secondary px-5 py-4 -mx-5">
        <div className="text-muted-foreground">
          <div className="text-xs opacity-80">
            Updated {relativeTimeFromNow(job.created_on)}{" "}
          </div>
          <div className="text-2sm mt-2">
            By{" "}
            <span className="text-primary font-semibold">
              {job.created_by_name}
            </span>
          </div>
        </div>
        <div className="flex">
          <Badge
            variant="ghost"
            className={cn(
              "px-3 gap-1",
              job.setting.sharable ? "text-primary" : "text-destructive",
            )}
          >
            {job.setting.sharable ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
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
