import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { type LucideIcon } from "lucide-react";

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
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}
          {number}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
