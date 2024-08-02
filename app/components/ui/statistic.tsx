import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface StatisticProps {
  title: string;
  number: number;
  prefix: string;
  Icon: LucideIcon;
  description: string;
}

export default function Statistic({
  Icon,
  title,
  number,
  prefix,
  description,
}: StatisticProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        <Icon />
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">
          {prefix}
          {number}
        </div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  );
}
