import {
  FilesIcon,
  TicketIcon,
  User,
  Users2Icon,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";
import TicketListCard from "~/components/ticket-list";
import Statistic from "~/components/ui/statistic";
import { tickets } from "~/fakedata";

const tempStats: { name: string; value: number; Icon: LucideIcon }[] = [
  { name: "Files", value: 18910, Icon: FilesIcon },
  { name: "Users", value: 3, Icon: Users2Icon },
  { name: "Alumni", value: 10, Icon: User },
  { name: "Opened Tickets", value: 2, Icon: TicketIcon },
];

const statusOrderForSorting = {
  created: 0,
  ongoing: 1,
  "not-resolved": 2,
  resolved: 3,
};

export default function OverviewPage() {
  const sortedTickets = useMemo(
    () =>
      tickets.sort(
        (a, b) =>
          statusOrderForSorting[a.status] - statusOrderForSorting[b.status]
      ),
    []
  );
  return (
    <div className="h-screen overflow-hidden">
      <div className="px-8 mt-6">
        <div className="grid grid-cols-4 gap-6">
          {tempStats.map((s) => (
            <Statistic
              key={s.name}
              title={s.name}
              number={s.value}
              prefix={""}
              Icon={s.Icon}
              description={""}
            />
          ))}
        </div>
        <div className="flex gap-6 mt-6 items-start">
          <div className="w-7/12">
            {/* Contract Level Detail Card */}
            <div>TODO : CARDS & QUICK LINKS</div>
          </div>
          <div className="w-5/12">
            <TicketListCard tickets={sortedTickets} />
          </div>
        </div>
      </div>
    </div>
  );
}
