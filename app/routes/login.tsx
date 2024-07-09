import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { z } from "zod";
import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFInput } from "~/components/form/RHFInput";
import { LoadingButton } from "~/components/loading-btn";

export const meta: MetaFunction = () => [
  { title: "Login - The Alumni Project" },
  { name: "description", content: "Login to Alumni Project" },
];

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});
const resolver = zodResolver(schema);
type FormData = z.infer<typeof schema>;

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, receivedValues: defaultValues } =
    await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    return json({ errors, defaultValues });
  }

  // make request api
  // if success
  //    create session & redirect to overview
  // if error
  //    show alert

  return redirect("/overview");
};

export default function LoginForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({ resolver });
  const { state } = useNavigation();
  const isSubmitting = state === "loading" || state === "submitting";

  return (
    <div className="h-full w-full flex-1 flex justify-center items-center">
      <Form onSubmit={handleSubmit} method="post">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <RHFInput error={errors.email} {...register("email")} />
            <RHFInput
              error={errors.password}
              autoComplete=""
              {...register("password")}
              type="password"
            />
          </CardContent>
          <CardFooter>
            <LoadingButton loading={isSubmitting} type="submit">
              Sign In
            </LoadingButton>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}
