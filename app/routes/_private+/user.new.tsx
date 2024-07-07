import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { ActionFunctionArgs } from "@remix-run/node";
import { RHFInput } from "~/components/form/RHFInput";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(2),
  role: z.string().min(2),
  permTempl: z.string().min(2),
});
const resolver = zodResolver(schema);
type FormData = z.infer<typeof schema>;

export const loader = async ({ request }: ActionFunctionArgs) => {
  const { errors, receivedValues: defaultValues } =
    await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return { errors, defaultValues };
  }

  // Make Call to API
  // If Sucess - redirect
  // If error - show error message using a alert
};

export default function UserPage() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useRemixForm<FormData>({ resolver });
  return (
    <>
      <div></div>
      <Form onSubmit={handleSubmit} method="post">
        <Card className="mt-6 px-6 py-6">
          <div className="grid grid-cols-3 gap-y-4 gap-x-8">
            <RHFInput {...register("name")} error={errors.name} />
            <RHFInput {...register("email")} error={errors.email} />
            <RHFInput {...register("password")} error={errors.password} />
            <RHFInput {...register("role")} error={errors.role} />
            <RHFInput
              {...register("permTempl")}
              displayName="Permission Template"
              error={errors.permTempl}
            />
            <div className="mt-2 col-span-3 flex justify-between">
              <Button type="button" onClick={() => reset()} variant="outline">
                Reset
              </Button>
              <Button>Submit</Button>
            </div>
          </div>
        </Card>
      </Form>
    </>
  );
}
