import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
  replace as redirect,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { MailIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { z } from "zod";
import LoginPageLayout from "~/components/LoginPageLayout";
import { FormFieldError } from "~/components/form/form-primitives";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { LoadingButton } from "~/components/ui/loading-btn";
import { getAuthSession } from "~/server/auth-session.server";
import { getRedirectURLByRole } from "~/server/helper.server";

export const meta: MetaFunction = ({ location }) => {
  const intent = new URLSearchParams(location.search).get("intent");
  const title = `${intent === "reset" ? "Reset Password" : "Email Login"} - The Alumni Project`;
  const content =
    intent === "reset"
      ? "Reset Password"
      : "Login to Alumni Project using email magic link";
  return [{ title }, { name: "description", content }];
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getAuthSession(request);
  if (session?.data.role) {
    return redirect(getRedirectURLByRole(session.data.role));
  }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const searchParams = new URL(request.url).searchParams;
  const email = formData.get("email");
  const { data, error } = z.string().email().min(1).safeParse(email);
  if (!data) {
    return json({ error: error?.errors[0].message, sucess: false });
  }

  const intent = searchParams.get("intent");
  if (!(intent === "reset" || intent === "magic")) {
    console.log(intent);
    return redirect("/login/email?intent=magic");
  }

  console.log(intent);
  const isResetIntent = intent === "reset";
  if (isResetIntent) {
    // TODO send reset email
    return json({ sucess: true, error: undefined });
  }
  // TODO send magic email
  return json({ sucess: true, error: undefined });
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const isResetIntent = searchParams.get("intent") === "reset";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const { state } = useNavigation();
  const isSubmitting = state === "loading" || state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      emailRef.current?.focus();
    }
  }, [isSubmitting]);

  return (
    <LoginPageLayout>
      <Form replace className="max-w-md w-full" method="post">
        <Card className="p-4 shadow-md">
          <CardHeader className="text-center">
            {isResetIntent ? (
              <>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription className="pt-1">
                  Enter your registered email address to receive instructions
                  for resetting your password.
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
                <CardDescription>Login using your email</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {actionData?.sucess ? (
              <div className="p-4 bg-secondary items-center flex gap-3 rounded">
                <MailIcon className="w-10 h-10 rounded bg-primary text-primary-foreground basis-10 p-2" />
                <div className="flex-1">
                  <div className="text-sm">
                    {isResetIntent
                      ? "Password reset instructions have been sent to your registered email"
                      : "Check your email for a special login link"}
                  </div>
                  <div className="text-xs opacity-80 mt-1">
                    Be sure to check your spam...
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Label>Email</Label>
                <Input name="email" ref={emailRef} className="mt-1.5" />
                <FormFieldError error={actionData?.error} />
              </div>
            )}
          </CardContent>
          {!actionData?.sucess && (
            <CardFooter>
              <LoadingButton
                className="w-full"
                loading={isSubmitting}
                type="submit"
              >
                <MailIcon className="w-4 h-4" />
                {isResetIntent ? "Email Instruction" : "Email"}
              </LoadingButton>
            </CardFooter>
          )}
        </Card>
      </Form>
    </LoginPageLayout>
  );
}
