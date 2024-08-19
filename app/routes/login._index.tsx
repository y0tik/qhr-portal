import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
  replace as redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { jwtDecode } from "jwt-decode";
import { MailIcon } from "lucide-react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { ErrorAlert } from "~/components/ErrorAlert";
import LoginPageLayout from "~/components/LoginPageLayout";
import { RHFInput } from "~/components/form/RHFInput";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { LoadingButton } from "~/components/ui/loading-btn";
import api from "~/services/api.server";
import { getSession, setSession } from "~/services/session.server";
import { formatProjectTitle } from "~/utils/const";
import { getMessageForCode } from "~/utils/errorUtils.server";
import { features } from "~/utils/features.server";
import { useFormData } from "~/utils/formdata.server";
import { dashboardURL } from "~/utils/const";
import { verifyOTP as otp } from "~/utils/otp.cookie.server";

import type { Role } from "~/utils/types";
export type LoginReponse = {
  access_token: string;
};
type TokenType = {
  sub: { username: string; id: number; role: Role };
};

export const meta: MetaFunction = () => [
  { title: formatProjectTitle("Login") },
  { name: "description", content: "Login to the alumnux project" },
];

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must be at most 20 characters long." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  // email: z.string().email().min(1),
  password: z.string().min(1),
});

const resolver = zodResolver(schema);
type FormData = z.infer<typeof schema>;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request);
  if (session?.data.role) return redirect(dashboardURL(session.data.role));

  const params = new URL(request.url).searchParams;
  return json({ error: getMessageForCode(params.get("code")) });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const params = new URL(request.url).searchParams;
  const callbackUrl = params.get("callbackUrl");

  const { data, errors } = await useFormData(request, resolver);
  if (!data) return json(errors);

  // feat: OTP
  if (features.enableOTP()) {
    const base = "/login/otp";
    const cbQuery = callbackUrl ? `?callbackURL=${callbackUrl}` : "";
    return redirect(`${base}${cbQuery}`, {
      headers: {
        "Set-Cookie": await otp.serialize({ username: data.username }),
      },
    });
  }

  // TODO :: REMOVE
  // check if mock login is available
  const { enable, getMockUser } = features.enableMockLogin();
  if (enable) {
    const headers = await setSession(request, getMockUser(data.username));
    return redirect(callbackUrl ?? dashboardURL(data.role), headers);
  }

  const { response, error } = await api.post<LoginReponse>("/auth/login", data);
  if (error) {
    return json({
      errors: { root: { message: "Invalid details provided" } },
    });
  }

  const token: TokenType = jwtDecode(response.access_token);
  const headers = await setSession(request, {
    // Use email from response
    email: "test@test.com",
    atoken: response.access_token,
    cid: token.sub.id,
    uname: token.sub.username,
    id: token.sub.id,
    role: token.sub.role,
  });

  return redirect(callbackUrl ?? dashboardURL(data.role), headers);
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
    <LoginPageLayout>
      <Form
        replace
        className="max-w-md w-full"
        onSubmit={handleSubmit}
        method="post"
      >
        <Card className="p-2 shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
            <CardDescription>Login to your account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            {!isSubmitting && (error || errors.root?.message) && (
              // Display Redirect Errors & Form Error
              <ErrorAlert className="mb-1">
                {errors.root?.message || error}
              </ErrorAlert>
            )}
            <RHFInput error={errors.username} {...register("username")} />
            {/* <RHFInput error={errors.email} {...register("email")} /> */}
            <RHFInput
              error={errors.password}
              autoComplete=""
              {...register("password")}
              type="password"
            />
            <Link to="/login/email?intent=reset" className="text-center">
              Forgot Password ?
            </Link>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <LoadingButton
              className="w-full"
              loading={isSubmitting}
              type="submit"
            >
              Sign In
            </LoadingButton>
            <Divider />
            <Button asChild className="w-full" variant="outline">
              <Link to="/login/email?intent=magic">
                <MailIcon className="w-4 h-4" />
                Login With Email
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </LoginPageLayout>
  );
}

const Divider = () => (
  <div className="relative w-full text-center">
    <div className="absolute left-0 right-0 top-1/2 z-[1] h-[1px] bg-secondary" />
    <div className="relative text-center bg-white px-2 text-sm text-muted-foreground inline-block z-[1]">
      OR
    </div>
  </div>
);
