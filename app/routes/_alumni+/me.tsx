import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { ExampleCompanyLogo } from "~/components/header/header";
import { MenuItem } from "~/components/header/navigation-menu";
import { Button } from "~/components/ui/button";
import { loader } from "./_layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ArrowUpRight,
  FileText,
  Mail,
  Calendar,
  Clipboard,
  File,
  LucideIcon,
  PiggyBank,
  UserPlus,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { ActionLogout } from "../action+/signout";
import { cn } from "~/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import TicketListCard from "~/components/ticket-list";
import { tickets } from "~/fakedata";
import { Ticket } from "~/type";
import { ticketColorMapping } from "~/constant";

// Define mock icons (replace these with actual icons from lucide-react or similar)
export const ALUMNI_NAVIGATION_MENU: MenuItem[] = [
  { name: "Service Requests", to: "/me/tickets", role: [] },
  { name: "Settings", to: "/settings", role: [] },
];

export const AlumniHeader = () => {
  const { pathname } = useLocation();
  const { uname } = useLoaderData<typeof loader>();
  return (
    <div className="bg-secondary/80 border-b">
      <div className="h-14 container grid grid-cols-5 items-center">
        <div className="col-span-2">
          <ExampleCompanyLogo />
        </div>
        <div className="col-span-1 text-center">
          <Link to="/me" className="text-lg text-center text-primary">
            Welcome, <b>{uname}</b>
          </Link>
        </div>
        <div className="col-span-2 text-right space-x-2">
          <Button asChild size="sm" variant="ghost">
            <Link to="/me">Home</Link>
          </Button>
          {ALUMNI_NAVIGATION_MENU.map((m) => (
            <Button
              asChild
              size="sm"
              variant="outline"
              className={
                pathname === m.to
                  ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : ""
              }
              key={m.to}
            >
              <Link to={m.to}>{m.name}</Link>
            </Button>
          ))}
          <ActionLogout>
            <Button size="sm" variant="outline">
              Logout
            </Button>
          </ActionLogout>
        </div>
      </div>
    </div>
  );
};

type News = {
  title: string;
  img: string;
  description: string;
  latest: boolean;
};
const newsData: News[] = [
  {
    title: "New Sustainability Initiative Launch",
    img: "https://via.placeholder.com/800x600.png?text=News+Image+1", // Example placeholder image
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida libero sed lectus consectetur, vel varius nulla ullamcorper.",
    latest: true,
  },

  {
    title: "Company Expands Global Operations",
    img: "https://via.placeholder.com/800x600.png?text=News+Image+2", // Example placeholder image
    description:
      "Integer non arcu eget nunc posuere varius id et mauris. Nullam auctor orci at lectus sollicitudin, at ultrices ex ultrices.",
    latest: false,
  },
  {
    title: "Launch of New AI Technology",
    img: "https://via.placeholder.com/800x600.png?text=News+Image+3", // Example placeholder image
    description:
      "Praesent eu purus sit amet tortor aliquam iaculis. Suspendisse varius mi at nisl congue rutrum. Nullam eget ligula ac metus convallis tincidunt.",
    latest: false,
  },
];

const NewsCardItem = ({ description, title, latest, img }: News) => {
  return (
    <div className="flex overflow-clip rounded-md border bg-gray-50">
      <div className="w-2/5">
        <div className="relative h-full">
          <img
            src={img}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="w-3/5 px-3 pt-2.5 pb-3">
        <div className="font-semibold">{title}</div>
        <div className="mt-0.5 line-clamp-1 text-sm opacity-80">
          {description}
        </div>
        <div className="flex text-xs mt-2.5 text-muted-foreground gap-2 items-center">
          {latest && <Badge>New</Badge>}
          <p>Published : 04/12/2023</p>
        </div>
      </div>
    </div>
  );
};
const LatestNewsCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-end">
          <CardTitle>Latest News</CardTitle>
          <Button
            asChild
            variant="link"
            size="sm"
            className="p-0 h-auto items-center"
          >
            <Link to="/company/news">
              View More
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 overflow-hidden">
          {newsData.map((n) => (
            <NewsCardItem key={n.title} {...n} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CompanyOverviewCard = () => {
  return (
    <Card className="bg-transparent text-white border relative overflow-clip">
      <div className="absolute inset-0 bg-red-400">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="inset-0 absolute z-10 bg-gradient-to-t -mt-40 from-black to-transparent"></div>
      <CardContent className="text-center pb-0 relative z-20">
        <div className="mt-8 inline-block w-[250px] py-4 rounded-lg opacity-80 backdrop-blur-lg bg-white text-black">
          <div className="flex justify-center items-center text-lg font-medium ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-16 w-16"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
        </div>
        <div className="mt-4 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <div className="mt-1 text-sm text-white opacity-60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deserunt
          omnis nulla quaerat iste similique commodi eligendi autem omnis nulla
          quaerat iste similique commodi eligendi autem
        </div>
        <div className="grid grid-cols-4 pt-5 pb-6 -mx-5 px-10 bg-blue-800 text-white bg-opacity-50 mt-6">
          {[
            { stat: "73M+", desc: "Developers" },
            { stat: "4M+", desc: "Organizations" },
            { stat: "120+", desc: "Offices / Branches" },
            { stat: "30+", desc: "Years in Industry" },
          ].map((e) => (
            <div
              key={e.stat}
              className="flex flex-col items-center justify-center"
            >
              <dt className="mb-1 text-3xl font-extrabold">{e.stat}</dt>
              <dd className="text-white text-opacity-60 text-sm dark:text-gray-400">
                {e.desc}
              </dd>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

type Category = {
  id: string;
  title: string;
  icon: LucideIcon;
  color: (alpha?: number) => string;
};

const categorys: Category[] = [
  {
    id: "payslips",
    title: "Payslips",
    icon: FileText,
    color: (alpha = 0.3) => `rgba(34, 193, 195, ${alpha} )`,
  },
  {
    id: "letters",
    title: "Letters",
    icon: Mail,
    color: (alpha = 0.3) => `rgba(255, 87, 34, ${alpha} )`,
  },
  {
    id: "finance",
    title: "Finance",
    icon: PiggyBank,
    color: (alpha = 0.3) => `rgba(33, 150, 243, ${alpha} )`,
  },
  {
    id: "contracts",
    title: "Contracts",
    icon: File,
    color: (alpha = 0.3) => `rgba(96, 125, 139, ${alpha} )`,
  },
  {
    id: "calendars",
    title: "Calendars",
    icon: Calendar,
    color: (alpha = 0.3) => `rgba(76, 175, 80, ${alpha} )`,
  },
  {
    id: "documentation",
    title: "Documentation",
    icon: Clipboard,
    color: (alpha = 0.3) => `rgba(255, 193, 7, ${alpha} )`,
  },
  // {
  //   id: "job-postings",
  //   title: "Job Postings",
  //   icon: Briefcase,
  //   () =>color: "rgba(255, 64, 129, ) // Pink
  // },
  {
    id: "training-materials",
    title: "Training Materials",
    icon: FileText, // Reusing the same icon for simplicity
    color: (alpha = 0.3) => `rgba(0, 188, 212, ${alpha} )`,
  },
  {
    id: "exit-forms",
    title: "Exit Forms",
    icon: FileText, // Reusing the same icon for simplicity
    color: (alpha = 0.3) => `rgba(239, 83, 80, ${alpha} )`,
  },
  // {
  //   id: "employee-records",
  //   title: "Employee Records",
  //   icon: UserCheck,
  //   () =>color: "rgba(156, 39, 176, ) // Palpha = 0.3urple
].sort((a, b) => (a.title.length < b.title.length ? 1 : -1));

const DocumentCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-end">
          <CardTitle>My Document{"'"}s</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-4">
          {categorys.map((c) => (
            <Link
              to={`/documents/${c.id}`}
              key={c.title}
              style={{
                backgroundColor: c.color(0.2),
                borderColor: c.color(0.2),
              }}
              className={cn(
                "px-4 py-3 mt-3 relative shadow-lg hover:rotate-1 hover:scale-95 transition-transform hover:opacity-70 cursor-pointer flex items-center gap-2 rounded-md border-2 col-span-4"
                // c.title.length > 11 ? "lg:col-span-4" : "lg:col-span-3"
              )}
            >
              <div
                className="bg-black absolute -top-2 h-2 left-0.5 rounded-t-md shadow-sm w-12"
                style={{
                  backgroundColor: c.color(1),
                }}
              ></div>
              <c.icon className="w-5 h-5" style={{ color: c.color(1) }} />
              <div>{c.title}</div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

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

const JobPortalCard = () => {
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
          {jobs.map((c) => (
            <div
              key={c.id}
              className={cn(
                "px-4 py-2.5 bg-secondary/50 shadow border pb-4 items-center gap-2 rounded-md  col-span-4"
                // c.title.length > 11 ? "lg:col-span-4" : "lg:col-span-3"
              )}
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {c.location}
                  </div>
                </div>
                <div>
                  <Badge className="mt-1">{c.job_type}</Badge>
                </div>
              </div>
              <div className=" flex justify-between items-end">
                <div className="flex gap-2">
                  {c.tags.map((t) => (
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
      <CardFooter></CardFooter>
    </Card>
  );
};

const AlumniTicketList = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between items-center -mt-2">
          <CardTitle>My Service Request&apos;s</CardTitle>
          <Button size="sm" variant="default" className="">
            New Request
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-3">
        <div className="grid -mt-4 gap-3 overflow-hidden">
          {tickets.map((c) => (
            <div
              key={c.id}
              className={cn(
                "px-4 border rounded-md py-3 pb-4 items-center gap-2"
                // c.title.length > 11 ? "lg:col-span-4" : "lg:col-span-3"
              )}
            >
              <div className="">
                <div className="font-semibold">{c.subject}</div>
                <div className="text-sm text-muted-foreground">
                  {c.description}
                </div>
              </div>
              <div className="flex justify-between items-end mt-2">
                <div className="text-muted-foreground flex gap-3 text-sm items-center">
                  <Badge
                    className="uppercase"
                    style={{
                      whiteSpace: "nowrap",
                      background: ticketColorMapping[c.status][0],
                      color: ticketColorMapping[c.status][1],
                    }}
                  >
                    {c.status}
                  </Badge>
                  <div>
                    Assigned : <span>{c.assigned_to}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="h-8">
                    <ArrowUpRight className="w-4 h-4" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default function AlumniOverviewPage() {
  return (
    <div className="flex-1 container mx-auto py-4 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 bg-white">
        <div className="col-span-3 flex flex-col gap-4">
          <CompanyOverviewCard />
          <LatestNewsCard />
          <AlumniTicketList tickets={tickets.slice(0, 4)} />
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <DocumentCard />
          <JobPortalCard />
        </div>
      </div>
    </div>
  );
}
