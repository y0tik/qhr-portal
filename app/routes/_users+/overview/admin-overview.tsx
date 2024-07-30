import { Link } from "@remix-run/react";
import {
  FilesIcon,
  TicketIcon,
  User,
  Users2Icon,
  type LucideIcon,
} from "lucide-react";
import { PlanCard } from "~/components/feature/user/plan-card";
import { MockedAlumniTicketsCard } from "~/components/feature/_common/tickets-card";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import Statistic from "~/components/ui/statistic";

const tempStats: { name: string; value: number; Icon: LucideIcon }[] = [
  { name: "Files", value: 18910, Icon: FilesIcon },
  { name: "Users", value: 3, Icon: Users2Icon },
  { name: "Alumni", value: 10, Icon: User },
  { name: "Opened Tickets", value: 2, Icon: TicketIcon },
];

export default function AdminOverview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex space-x-6">
        {tempStats.map((s) => (
          <div key={s.name} className="w-3/12">
            <Statistic
              title={s.name}
              number={s.value}
              prefix={""}
              Icon={s.Icon}
              description={""}
            />
          </div>
        ))}
      </div>
      <div className="grow space-x-6 flex mt-6 min-h-0">
        <div className="w-3/12">
          <PlanCard />
        </div>
        <div className="w-3/12">
          <Card>
            <div className="p-6">
              <CardTitle className="text-base text-primary">
                Shortcuts
              </CardTitle>
              <div className="space-y-3 mt-4">
                {[
                  { name: "Create User", to: "/user/create" },
                  { name: "Update Settings", to: "/settings" },
                ].map((e) => (
                  <Button
                    className="w-full"
                    variant="outline"
                    key={e.name}
                    asChild
                  >
                    <Link to={e.to}>{e.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>
        <div className="w-6/12 flex flex-col">
          <MockedAlumniTicketsCard />
        </div>
      </div>
    </div>
  );
}
