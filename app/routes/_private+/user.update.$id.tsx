import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const loader: LoaderFunction = ({ params }) => {
  const id = params.id!;
  return { id };
};

export default function UserPage() {
  const { id } = useLoaderData<typeof loader>();
  return (
    <div className="px-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Update User With ID {id}</CardTitle>
          <CardDescription></CardDescription>
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
