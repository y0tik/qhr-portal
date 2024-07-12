import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { ActionFunctionArgs } from "@remix-run/node";
import { RHFInput } from "~/components/form/RHFInput";
import AutoBreadcrumb from "~/components/auto-breadcrumb";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(2),
  joiningDte: z.string().date(),
  leavingDte: z.string().date(),
  empId: z.string().min(1),
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

export default function CreateAlumniPage() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useRemixForm<FormData>({ resolver });
  return (
    <>
      <AutoBreadcrumb />
      <Form onSubmit={handleSubmit} method="post">
        <div className="flex flex-wrap h-full">
          <Card className="px-6 py-6 w-7/12 h-full">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <RHFInput {...register("name")} error={errors.name} />
              <RHFInput {...register("email")} error={errors.email} />
              <RHFInput
                {...register("empId")}
                displayName="Employee ID"
                error={errors.name}
              />
              <RHFInput
                {...register("joiningDte")}
                displayName="Joining Date"
                error={errors.joiningDte}
              />
              <RHFInput
                {...register("leavingDte")}
                displayName="Exit Date"
                error={errors.leavingDte}
              />
              <div className="mt-2 col-span-2 flex justify-between">
                <Button type="button" onClick={() => reset()} variant="outline">
                  Reset
                </Button>
                <Button>Create</Button>
              </div>
            </div>
          </Card>
        </div>
      </Form>
    </>
  );
}
