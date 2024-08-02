import { ArrowUpRight, UserPlus } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Job = {
  id: string;
  title: string;
  location: string;
  job_type: "Full-Time" | "Remote";
  created_at: Date;
  created_at_relative: string;
  tags: string[];
};

const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    location: "Karnataka",
    job_type: "Full-Time",
    created_at: new Date("2024-07-05T14:00:00Z"),
    created_at_relative: "3 weeks ago",
    tags: ["Development", "React", "JavaScript"],
  },
  {
    id: "2",
    title: "Digital Marketer",
    location: "Maharashtra",
    job_type: "Remote",
    created_at: new Date("2024-07-10T09:30:00Z"),
    created_at_relative: "2 weeks ago",
    tags: ["Marketing", "SEO", "Content Creation"],
  },
  {
    id: "3",
    title: "DevOps Engineer",
    location: "Delhi",
    job_type: "Full-Time",
    created_at: new Date("2024-07-15T11:00:00Z"),
    created_at_relative: "1 week ago",
    tags: ["DevOps", "AWS", "Docker"],
  },
  {
    id: "5",
    title: "Graphic Designer",
    location: "Tamil Nadu",
    job_type: "Full-Time",
    created_at: new Date("2024-07-22T13:45:00Z"),
    created_at_relative: "3 days ago",
    tags: ["Design", "Adobe", "Creativity"],
  },
  {
    id: "6",
    title: "Data Analyst",
    location: "Gujarat",
    job_type: "Remote",
    created_at: new Date("2024-07-25T12:30:00Z"),
    created_at_relative: "1 day ago",
    tags: ["Data Analysis", "SQL", "Excel"],
  },
];

type Props = {
  jobs: Job[];
};

export const JobsCard = ({ jobs }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="-mt-2 flex items-end justify-between">
          <CardTitle>Latest Job&apos;s</CardTitle>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="h-8 w-[120px] px-2">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="full_time">Full Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="-mt-1 grid gap-4 overflow-hidden">
          {jobs.map((j) => (
            <div
              key={j.id}
              className="col-span-4 items-center gap-2 rounded-md border bg-secondary/50 px-4 py-2.5 pb-4 shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold">{j.title}</div>
                  <div className="text-muted-foreground text-sm">
                    {j.location}
                  </div>
                </div>
                <Badge className="mt-1">{j.job_type}</Badge>
              </div>
              <div className="mt-3 flex flex-wrap justify-between gap-3 md:items-end lg:mt-0">
                <div className="flex gap-2">
                  {j.tags.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="h-8" variant="secondary">
                    <UserPlus className="h-4 w-4" />
                    Refer{" "}
                    <span className="hidden lg:inline-block">Someone</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-auto px-2">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const MockedJobsCard = () => <JobsCard {...{ jobs }} />;
