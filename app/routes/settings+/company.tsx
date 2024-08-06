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

export default function CompanySettingPage() {
  return (
    <Card>
      <form>
        <CardHeader>
          <CardTitle>Company Logo</CardTitle>
          <CardDescription>
            Specify the URL of the company logo that will displayed in header
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="https://example.com/logo.png" />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
