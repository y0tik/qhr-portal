import { Link } from "@remix-run/react";
import {
  FilesIcon,
  type LucideIcon,
  TicketIcon,
  User,
  Users2Icon,
} from "lucide-react";
import {
  MockedAlumniTicketsCard,
  TicketsCard,
  tickets,
} from "~/components/feature/_common/tickets-card";
import { PlanCard } from "~/components/feature/user/plan-card";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Statistic from "~/components/ui/statistic";

const tempStats: { name: string; value: number; Icon: LucideIcon }[] = [
  { name: "Files", value: 18910, Icon: FilesIcon },
  // { name: "Users", value: 3, Icon: Users2Icon },
  { name: "Alumni", value: 10, Icon: User },
  { name: "Opened Tickets", value: 2, Icon: TicketIcon },
];

export default function AdminOverview() {
  return (
    <div className="grid grid-cols-1 grid-rows-12 lg:grid-cols-12 gap-5">
      <div className="grid col-span-7 gap-5 grid-cols-3">
        {tempStats.map((s) => (
          <div key={s.name}>
            <Statistic
              title={s.name}
              number={s.value}
              prefix={""}
              Icon={s.Icon}
              description={""}
            />
          </div>
        ))}
        <div className="col-span-3 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Shortcuts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 flex-wrap">
                {/* TODO ADD ICONS */}
                {[
                  { name: "Create User", to: "/user/create" },
                  { name: "Bulk Upload", to: "/bulk" },
                  { name: "Update Settings", to: "/settings" },
                ].map((e) => (
                  <Button variant="outline" key={e.name} asChild>
                    <Link to={e.to}>{e.name}</Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          <PlanCard />
        </div>
      </div>
      <div className="col-span-5 row-span-12 overflow-hidden">
        <TicketsCard
          tickets={tickets.slice(0, 10)}
          title="Latest Service Requests"
          cta_url="/tickets"
          cta_title="Manage"
        />
      </div>
    </div>
  );
}
