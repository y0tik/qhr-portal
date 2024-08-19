import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  json,
  replace as redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import type { OTPInput } from "input-otp";
import { useEffect, useRef } from "react";
import { ErrorAlert } from "~/components/ErrorAlert";
import LoginPageLayout from "~/components/LoginPageLayout";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { Label } from "~/components/ui/label";
import { LoadingButton } from "~/components/ui/loading-btn";
import { env } from "~/env.server";
import { setSession } from "~/services/session.server";
import { features } from "~/utils/features.server";
import { verifyOTP } from "~/utils/otp.cookie.server";
import type { Role } from "~/utils/types";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie: { username: string } | null =
    await verifyOTP.parse(cookieHeader);

  // check if verifyOTP is cookie is set
  if (!cookie) {
    return redirect("/login?code=204l2X");
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const params = new URL(request.url).searchParams;
  const callbackUrl = params.get("callbackURL");

  const formData = await request.formData();
  const otp = formData.get("otp");
  if (!otp || otp === "") return json({ error: "Please enter otp" });

  const cookieHeader = request.headers.get("Cookie");
  const cookie: { username: string } | null =
    await verifyOTP.parse(cookieHeader);

  // check if verifyOTP is cookie is set
  if (!cookie) {
    return redirect("/login?code=204l2X");
  }

  const { enable, getMockUser } = features.enableMockLogin();
  if (enable && otp === "000000") {
    const sessionHeader = await setSession(
      request,
      getMockUser(cookie.username),
    );
    // clear 'verifyOtp' cookie and set auth session
    return redirect(callbackUrl ?? "/", {
      headers: [
        ["Set-Cookie", sessionHeader.headers["Set-Cookie"]],
        ["Set-Cookie", await verifyOTP.serialize("", { maxAge: 1 })],
      ],
    });
  }

  return json({ error: "Invalid OTP" });
}

export default function Page() {
  const otpInputRef = useRef<React.ElementRef<typeof OTPInput>>(null);
  const formRef = useRef<React.ElementRef<typeof Form>>(null);
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  useEffect(() => {
    if (otpInputRef.current && !isSubmitting) {
      otpInputRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <LoginPageLayout>
      <Form ref={formRef} replace className="max-w-md w-full" method="post">
        <Card className="p-2 shadow-md">
          <CardHeader className="text-center">
            <Label className="text-xl font-semibold">Enter OTP</Label>
            <CardDescription className="leading-snug">
              We have sent a one time password to the resgister email
            </CardDescription>
          </CardHeader>
          <CardContent>
            {actionData?.error && (
              <ErrorAlert className="mb-4">{actionData.error}</ErrorAlert>
            )}
            <InputOTP
              maxLength={6}
              ref={otpInputRef}
              containerClassName="pt-2"
              name="otp"
              onComplete={() => formRef?.current?.requestSubmit()}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </CardContent>
          <CardFooter className="flex-col pb-0">
            <LoadingButton
              type="submit"
              size="sm"
              className="px-12"
              loading={isSubmitting}
            >
              Verify
            </LoadingButton>
            <div className="text-sm text-center mt-6 text-muted-foreground">
              Did not receive the code ?
              <Button variant="link" className="px-1 h-auto">
                Resend
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="text-sm text-center mt-4 text-muted-foreground">
          Wrong Email ?
          <Link to="/login">
            <Button variant="link" className="px-1 h-auto">
              Go Back
            </Button>
          </Link>
        </div>
      </Form>
    </LoginPageLayout>
  );
}
