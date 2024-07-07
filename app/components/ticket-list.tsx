// import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import type { Ticket } from "~/type";
import { ticketColorMapping } from "~/constant";

type TicklistProps = {
  tickets: Ticket[];
};

export default function TicketListCard({ tickets }: TicklistProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pt-5 pb-2">
        <CardTitle className="text-lg">Recent Tickets</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      {tickets.length === 0 && (
        <div className="px-6 text-muted-foreground">No Tickets</div>
      )}
      {tickets.length > 0 && (
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="h-[26rem] overflow-auto divide-y">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-gray-200"
              >
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {t.subject}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t.description}
                  </p>
                  <div className="flex gap-2 items-center mt-2 text-sm text-muted-foreground">
                    <p>Created By : {t.created_by}</p>
                    {t.status === "ongoing" && (
                      <>
                        <span>|</span>
                        <p className="text-sm text-muted-foreground">
                          Assigned To : {t.assigned_to}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="ml-auto font-medium flex items-center gap-2">
                  <Badge
                    style={{
                      whiteSpace: "nowrap",
                      background: ticketColorMapping[t.status][0],
                      color: ticketColorMapping[t.status][1],
                    }}
                  >
                    {t.status}
                  </Badge>
                  <Button variant="ghost">
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
