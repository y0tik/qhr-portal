import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ArrowUpRight, UserPlus } from "lucide-react";

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
        <div className="flex justify-between items-end -mt-2">
          <CardTitle>Latest Job&apos;s</CardTitle>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[120px] h-8 px-2">
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
        <div className="grid -mt-1 gap-4 overflow-hidden">
          {jobs.map((j) => (
            <div
              key={j.id}
              className="px-4 py-2.5 bg-secondary/50 shadow border pb-4 items-center gap-2 rounded-md  col-span-4"
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{j.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {j.location}
                  </div>
                </div>
                <Badge className="mt-1">{j.job_type}</Badge>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex gap-2">
                  {j.tags.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="h-8" variant="secondary">
                    <UserPlus className="w-4 h-4" />
                    Refer Someone
                  </Button>
                  <Button size="sm" variant="outline" className="h-auto px-2">
                    <ArrowUpRight className="w-4 h-4" />
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
