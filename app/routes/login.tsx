import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { jwtDecode } from "jwt-decode";
import { AlertCircle } from "lucide-react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { RHFInput } from "~/components/form/RHFInput";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { LoadingButton } from "~/components/ui/loading-btn";
import api from "~/server/api.server";
import { getAuthSession, setAuthSession } from "~/server/auth-session.server";
import { friendlyMsgForCode, requireFormData } from "~/server/helper.server";
import type { LoginReponse } from "~/server/response.type";
import type { Role } from "~/types";

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
  const session = await getAuthSession(request);
  if (session) {
    const redirectTo = session.data.role === "employee" ? "/me" : "/overview";
    return redirect(redirectTo);
  }
  const params = new URL(request.url).searchParams;
  return json({
    error: friendlyMsgForCode(params.get("code")),
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const params = new URL(request.url).searchParams;
  const callbackUrl = params.get("callbackUrl");

  const { data, errors } = await requireFormData<FormData>(request, resolver);
  if (!data) {
    return json(errors);
  }

  const headers = await setAuthSession(request, {
    email: "test",
    atoken: "test",
    cid: 10,
    uname: "username",
    id: 123,
    role: "employee",
  });
  return redirect(callbackUrl ?? "/overview", headers);

  // // +start API - /auth/login
  // const { response, error } = await api.post<LoginReponse>("/auth/login", data);
  // if (error) {
  //   return json({
  //     errors: { root: { message: "Invalid details provided" } },
  //   });
  // }
  // // parse jwt and extract user id, user role & company id
  // const token = jwtDecode<{
  //   sub: { username: string; id: number; role: Role };
  // }>(response.access_token);
  // // create auth session
  // const headers = await setAuthSession(request, {
  //   email: data.email,
  //   atoken: response.access_token,
  //   cid: token.sub.id,
  //   uname: token.sub.username,
  //   id: token.sub.id,
  //   role: token.sub.role,
  // });
  // // redirect and with headers set
  // const redirectTo = token.sub.role === "employee" ? "/me" : "/overview";
  // return redirect(callbackUrl ?? redirectTo, headers);
  // // +end API - /auth/login
};

export default function LoginPage() {
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
      className="flex h-full w-full flex-1 items-center justify-center"
      method="post"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {!isSubmitting && (error || errors.root?.message) && (
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
