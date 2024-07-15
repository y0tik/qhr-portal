import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { z } from "zod";
import { useRemixForm } from "remix-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFInput } from "~/components/form/RHFInput";
import { LoadingButton } from "~/components/loading-btn";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { friendlyMsgForCode, requireFormData } from "~/server/helper.server";
import {
  hasValidAuthSession,
  setAuthSession,
} from "~/server/auth-session.server";
import api from "~/server/api.server";
import { LoginReponse } from "~/server/response.type";
import { jwtDecode } from "jwt-decode";
import { Role } from "~/types";

export { ErrorBoundary } from "~/components/error-boundary";

export const meta: MetaFunction = () => [
  { title: "Login - The Alumni Project" },
  { name: "description", content: "Login to Alumni Project" },
];

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must be at most 20 characters long." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  email: z.string().email().min(1),
  password: z.string().min(1),
});

const resolver = zodResolver(schema);
type FormData = z.infer<typeof schema>;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (await hasValidAuthSession(request)) {
    return redirect("/overview");
  }

  const params = new URL(request.url).searchParams;
  return json({
    error: friendlyMsgForCode(params.get("code")),
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { data, errors } = await requireFormData<FormData>(request, resolver);
  if (!data) {
    return json(errors);
  }

  // +start API - /auth/login
  const { response, error } = await api.post<LoginReponse>("/auth/login", data);
  if (error) {
    return json({
      errors: { root: { message: "Invalid details provided" } },
    });
  }
  // parse jwt and extract user id, user role & company id
  const token = jwtDecode<{
    sub: { username: string; id: number; role: Role };
  }>(response.access_token);
  // create auth session
  const headers = await setAuthSession(request, {
    email: data.email,
    atoken: response.access_token,
    cid: token.sub.id,
    uname: token.sub.username,
    id: token.sub.id,
    role: token.sub.role,
  });
  // redirect and with headers set
  return redirect("/overview", headers);
  // +end API - /auth/login
};

export default function LoginForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({ resolver, submitConfig: { replace: true } });
  const { error } = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  const isSubmitting = state === "loading" || state === "submitting";

  return (
    <Form
      replace
      onSubmit={handleSubmit}
      className="h-full w-full flex-1 flex justify-center items-center"
      method="post"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {(error || errors.root?.message) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errors.root?.message || error}
              </AlertDescription>
            </Alert>
          )}
          <RHFInput error={errors.username} {...register("username")} />
          <RHFInput error={errors.email} {...register("email")} />
          <RHFInput
            error={errors.password}
            autoComplete=""
            {...register("password")}
            type="password"
          />
        </CardContent>
        <CardFooter>
          <LoadingButton
            className="w-full"
            loading={isSubmitting}
            type="submit"
          >
            Sign In
          </LoadingButton>
        </CardFooter>
      </Card>
    </Form>
  );
}
