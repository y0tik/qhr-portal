import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useNavigation } from "@remix-run/react";
import { AlertCircle } from "lucide-react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { RHFDatePicker } from "~/components/form/RHFDatePicker";
import { RHFInput } from "~/components/form/RHFInput";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { LoadingButton } from "~/components/ui/loading-btn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ActionDeleteAlumniUser } from "~/routes/action+/alumni.delete.$id";

const schema = z
  .object({
    id: z.number().optional(),
    mode: z.enum(["create", "update"]).default("create"),
    password: z.string().min(4).optional().or(z.literal("")),
    username: z.string().min(2),
    email: z.string().email(),
    joining_date: z.coerce.date(),
    last_working_date: z.coerce.date(),
    emp_id: z.string().min(1),
  })
  .refine((data) => !(data.mode === "create" && !data.password), {
    message: "Password Required",
    path: ["password"],
  });

export const alumniResolver = zodResolver(schema);
export type AlumniFormData = z.infer<typeof schema>;

type Props = { defaultValues?: AlumniFormData };

export default function AlumniForm({ defaultValues }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    reset,
  } = useRemixForm<AlumniFormData>({ defaultValues, resolver: alumniResolver });
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";
  const isEdit = defaultValues?.id;
  return (
    <Form onSubmit={handleSubmit} method="post">
      {errors.root?.message && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex h-full flex-wrap items-start">
        <div className="w-8/12 pr-4">
          <Card className="px-6 py-6">
            <div className="grid grid-cols-3 gap-x-8 gap-y-4">
              <RHFInput {...register("username")} error={errors.username} />
              <RHFInput {...register("email")} error={errors.email} />
              <RHFInput {...register("password")} error={errors.password} />
              <RHFInput
                {...register("emp_id")}
                displayName="Employee ID"
                error={errors.emp_id}
              />
              <RHFDatePicker
                displayName="Joining Date"
                name="joining_date"
                control={control}
                error={errors.joining_date}
              />
              <RHFDatePicker
                displayName="Leaving Date"
                name="last_working_date"
                control={control}
                error={errors.last_working_date}
              />
              <div className="col-span-3 mt-6 flex justify-between">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => reset()}
                    variant="outline"
                  >
                    Reset
                  </Button>
                  {isEdit && (
                    <ActionDeleteAlumniUser id={String(defaultValues.id)} />
                  )}
                </div>
                <LoadingButton loading={isSubmitting} type="submit">
                  Submit
                </LoadingButton>
              </div>
            </div>
          </Card>
        </div>
        {isEdit && (
          <Card className="-my-8 h-full w-4/12">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full rounded-b-none py-2">
                <TabsTrigger value="Payslips">Payslips</TabsTrigger>
                <TabsTrigger value="Letters">Letters</TabsTrigger>
              </TabsList>
              <TabsContent value="Payslips" className="px-4">
                Upload Payslips Here
              </TabsContent>
              <TabsContent value="Letters" className="px-4">
                Upload Letters Here
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </Form>
  );
}
