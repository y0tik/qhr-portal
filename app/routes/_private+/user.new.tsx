import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export default function UserPage() {
  return (
    <div className="px-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>User Form</CardTitle>
          <CardDescription>
            Create user to allow them to login in the alumni portal. use this to
            create employee logins that will manage the portal and not alumni
            that will use this portal
          </CardDescription>
        </CardHeader>
        <CardContent>WIP : User Form</CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
