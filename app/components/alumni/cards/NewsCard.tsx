import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";

type News = {
  title: string;
  img: string;
  description: string;
  latest: boolean;
};

const mockedNews: News[] = [
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

const NewsItem = ({ description, title, latest, img }: News) => {
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

type Props = { news: News[]; title: string };

export const NewsCard = ({ news, title }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-end">
          <CardTitle>{title}</CardTitle>
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
      <CardContent className="space-y-4 overflow-hidden">
        {news.map((n) => (
          <NewsItem key={n.title} {...n} />
        ))}
      </CardContent>
    </Card>
  );
};

export const MockedLatestNewsCard = () => (
  <NewsCard title="Latest News" news={mockedNews} />
);
