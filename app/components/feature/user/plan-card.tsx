import { Button } from "~/components/ui//button";
import { Card, CardTitle } from "~/components/ui//card";

export const PlanCard = () => {
  return (
    <Card className="px-6 py-6">
      <CardTitle className="text-lg">Current Plan</CardTitle>
      <div className="px-4 py-2 rounded-md text-primary-foreground bg-primary mt-3">
        Premium
      </div>
      <div className="mt-3 text-muted-foreground">
        Next Billing on 12/23/2024
      </div>
      <Button variant="link" className="mt-2 h-auto p-0">
        More Details
      </Button>
    </Card>
  );
};
