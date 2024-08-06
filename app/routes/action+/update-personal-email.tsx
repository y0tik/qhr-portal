import { Button } from "~/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export const UpdatePersonalEmailFormCard = () => (
  <Card>
    <form>
      <CardHeader>
        <CardTitle>Personal Email</CardTitle>
        <CardDescription>Used to send service request update</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder="example@example.com" />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save</Button>
      </CardFooter>
    </form>
  </Card>
);
