import { Link } from "@remix-run/react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ticketColorMapping } from "~/utils/const";

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  category: string;
  subCategory: string;
  created_on: Date;
  created_by: string;
  created_by_img: string;
  assigned_to: string;
  assigned_to_img: string;
  status: "created" | "ongoing" | "not-resolved" | "resolved";
};

export const tickets: Ticket[] = [
  {
    id: "TCKT001",
    subject: "Internet Connectivity Issue",
    description: "Users are experiencing intermittent internet connectivity.",
    category: "IT Support",
    subCategory: "Network Issues",
    created_on: new Date("2024-07-01"),
    created_by: "John Doe",
    created_by_img: "https://example.com/johndoe.jpg",
    assigned_to: "Jane Smith",
    assigned_to_img: "https://example.com/janesmith.jpg",
    status: "ongoing",
  },
  {
    id: "TCKT002",
    subject: "Software Installation Problem",
    description: "Unable to install the latest version of software X.",
    category: "IT Support",
    subCategory: "Software Issues",
    created_on: new Date("2024-06-30"),
    created_by: "Alice Johnson",
    created_by_img: "https://example.com/alicejohnson.jpg",
    assigned_to: "Bob Brown",
    assigned_to_img: "https://example.com/bobbrown.jpg",
    status: "created",
  },
  {
    id: "TCKT003",
    subject: "Printer Not Printing",
    description: "Printer is not responding when trying to print documents.",
    category: "Hardware Support",
    subCategory: "Printer Issues",
    created_on: new Date("2024-07-02"),
    created_by: "Emily Davis",
    created_by_img: "https://example.com/emilydavis.jpg",
    assigned_to: "Chris Wilson",
    assigned_to_img: "https://example.com/chriswilson.jpg",
    status: "created",
  },
  {
    id: "TCKT004",
    subject: "Email Delivery Delay",
    description:
      "Outgoing emails are delayed and not reaching recipients promptly.",
    category: "Email Support",
    subCategory: "Delivery Issues",
    created_on: new Date("2024-07-03"),
    created_by: "Michael Lee",
    created_by_img: "https://example.com/michaellee.jpg",
    assigned_to: "Sarah Adams",
    assigned_to_img: "https://example.com/sarahadams.jpg",
    status: "not-resolved",
  },
  {
    id: "TCKT005",
    subject: "Data Backup Failure",
    description: "Scheduled data backups are failing unexpectedly.",
    category: "IT Support",
    subCategory: "Data Backup",
    created_on: new Date("2024-06-29"),
    created_by: "Andrew Wilson",
    created_by_img: "https://example.com/andrewwilson.jpg",
    assigned_to: "Emma Brown",
    assigned_to_img: "https://example.com/emmabrown.jpg",
    status: "resolved",
  },
  {
    id: "TCKT006",
    subject: "Server Performance Degradation",
    description: "Server X is experiencing slow performance during peak hours.",
    category: "IT Support",
    subCategory: "Server Issues",
    created_on: new Date("2024-06-28"),
    created_by: "Sophia Martinez",
    created_by_img: "https://example.com/sophiamartinez.jpg",
    assigned_to: "David Clark",
    assigned_to_img: "https://example.com/davidclark.jpg",
    status: "ongoing",
  },
  {
    id: "TCKT007",
    subject: "Password Reset Request",
    description: "User needs assistance with resetting their account password.",
    category: "Account Support",
    subCategory: "Password Reset",
    created_on: new Date("2024-06-27"),
    created_by: "Olivia Taylor",
    created_by_img: "https://example.com/oliviataylor.jpg",
    assigned_to: "Jason Green",
    assigned_to_img: "https://example.com/jasongreen.jpg",
    status: "created",
  },
  {
    id: "TCKT008",
    subject: "Software Bug Report",
    description: "Found a critical bug in software Y that causes crashes.",
    category: "Software Development",
    subCategory: "Bug Report",
    created_on: new Date("2024-07-04"),
    created_by: "Daniel Wilson",
    created_by_img: "https://example.com/danielwilson.jpg",
    assigned_to: "Isabella Brown",
    assigned_to_img: "https://example.com/isabellabrown.jpg",
    status: "created",
  },
  {
    id: "TCKT009",
    subject: "Website Downtime",
    description: "Website is currently down and inaccessible to users.",
    category: "Web Support",
    subCategory: "Downtime Issues",
    created_on: new Date("2024-07-03"),
    created_by: "James Anderson",
    created_by_img: "https://example.com/jamesanderson.jpg",
    assigned_to: "Sophie Roberts",
    assigned_to_img: "https://example.com/sophieroberts.jpg",
    status: "not-resolved",
  },
  {
    id: "TCKT010",
    subject: "Database Connection Error",
    description: "Unable to establish connection to the main database server.",
    category: "IT Support",
    subCategory: "Database Issues",
    created_on: new Date("2024-07-02"),
    created_by: "Mia Moore",
    created_by_img: "https://example.com/miamoore.jpg",
    assigned_to: "William Thompson",
    assigned_to_img: "https://example.com/williamthompson.jpg",
    status: "resolved",
  },
];
type Props = {
  tickets: Ticket[];
  title: string;
  cta_title?: string;
  cta_url?: string;
};

export const TicketsCard = ({ tickets, title, cta_url, cta_title }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="-mt-2 flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {cta_url && (
            <Button size="sm" asChild variant="default" className="">
              <Link to={cta_url}>
                {cta_title}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="-mt-4 grid gap-3 overflow-hidden">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="items-center gap-2 rounded-md border px-4 py-3 pb-4"
            >
              <div>
                <div className="font-semibold">{t.subject}</div>
                <div className="text-muted-foreground text-sm">
                  {t.description}
                </div>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Badge
                    className="uppercase"
                    style={{
                      whiteSpace: "nowrap",
                      background: ticketColorMapping[t.status][0],
                      color: ticketColorMapping[t.status][1],
                    }}
                  >
                    {t.status}
                  </Badge>
                  <div>Assigned : {t.assigned_to}</div>
                </div>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="h-8">
                    <ArrowUpRight className="h-4 w-4" />
                    View
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

export const MockedAlumniTicketsCard = () => (
  <TicketsCard
    tickets={tickets.slice(0, 3)}
    title="My Service Request's"
    cta_url="/tickets/create"
    cta_title="New Request"
  />
);
