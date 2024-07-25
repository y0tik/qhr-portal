import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { ExampleCompanyLogo } from "~/components/header/header";
import { MenuItem } from "~/components/header/navigation-menu";
import { Button } from "~/components/ui/button";
import { loader } from "./_layout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { ActionLogout } from "../action+/signout";

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
    <Card>
      <CardHeader>
        <CardTitle>Company Overview</CardTitle>
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

export default function AlumniOverviewPage() {
  return (
    <div className="flex-1 container mx-auto py-4 lg:px-0">
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 bg-white overflow-auto">
        <CompanyOverviewCard />
        <LatestNewsCard />
        <div className="flex h-full rounded-lg border bg-slate-200"></div>
        <div className="flex h-full rounded-lg border bg-slate-200"></div>
      </div>
    </div>
  );
}
