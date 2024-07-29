import { Link } from "@remix-run/react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ticketColorMapping } from "~/constant";
import { tickets } from "~/fakedata";
import { Ticket } from "~/type";

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
        <div className="flex justify-between items-center -mt-2">
          <CardTitle>{title}</CardTitle>
          {cta_url && (
            <Button size="sm" asChild variant="default" className="">
              <Link to={cta_url}>
                {cta_title}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-3">
        <div className="grid -mt-4 gap-3 overflow-hidden">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="px-4 border rounded-md py-3 pb-4 items-center gap-2"
            >
              <div>
                <div className="font-semibold">{t.subject}</div>
                <div className="text-sm text-muted-foreground">
                  {t.description}
                </div>
              </div>
              <div className="flex justify-between items-end mt-2">
                <div className="text-muted-foreground flex gap-3 text-sm items-center">
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
                    <ArrowUpRight className="w-4 h-4" />
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
    tickets={tickets}
    title="My Service Request's"
    cta_url="/tickets/create"
    cta_title="New Request"
  />
);
