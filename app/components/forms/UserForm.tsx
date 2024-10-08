import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useNavigation } from "@remix-run/react";
import { AlertCircle } from "lucide-react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { RHFCheckbox } from "~/components/forms/RHFCheckbox";
import { RHFInput } from "~/components/forms/RHFInput";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { LoadingButton } from "~/components/ui/loading-btn";
// import { ActionDeleteHRUser } from "~/routes/action+/user.delete.$id";

const schema = z
  .object({
    id: z.number().optional(),
    mode: z.enum(["create", "update"]).default("create"),
    password: z.string().min(4).optional().or(z.literal("")),
    username: z.string().min(2),
    email: z.string().email(),
    role_hr: z.boolean().default(false),
    role_support: z.boolean().default(false),
    perm_read: z.boolean().default(false),
    perm_write: z.boolean().default(false),
    perm_delete: z.boolean().default(false),
  })
  .refine((data) => !(data.mode === "update" && !data.id), {
    message: "id required",
    path: ["id"],
  })
  .refine((data) => !(data.mode === "create" && !data.password), {
    message: "Password Required",
    path: ["password"],
  })
  .refine(
    (data) =>
      !(data.mode === "create" && data.password && data.password.length < 6),
    {
      message: "Password should be greater than 5 Characters",
      path: ["password"],
    },
  );

export const userResolver = zodResolver(schema);
export type UserFormData = z.infer<typeof schema>;

export default function UserForm({
  defaultValues,
}: {
  defaultValues?: UserFormData;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    reset,
  } = useRemixForm<UserFormData>({ defaultValues, resolver: userResolver });
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
      <Card className="px-6 py-6">
        <div className="grid grid-cols-3 gap-x-8 gap-y-4">
          <RHFInput {...register("username")} error={errors.username} />
          <RHFInput {...register("email")} error={errors.email} />
          <RHFInput {...register("password")} error={errors.password} />

          <div className="mt-3">
            <Label>Role</Label>
            <div className="mt-0.5 text-muted-foreground text-sm">
              Choose the roles you wish to assign to this user
            </div>
            <div className="mt-4 flex gap-4">
              <RHFCheckbox
                displayName="HR"
                name="role_hr"
                control={control}
                error={errors.role_hr}
              />
              <RHFCheckbox
                name="role_support"
                displayName="SUPPORT"
                control={control}
                error={errors.role_support}
              />
            </div>
          </div>

          <div className="mt-3">
            <Label>Permissions</Label>
            <div className="mt-0.5 text-muted-foreground text-sm">
              Choose the permissions you wish to assign to this user
            </div>
            <div className="mt-4 flex gap-4">
              <RHFCheckbox
                name="perm_read"
                control={control}
                displayName="READ"
                className="text-green-600"
                error={errors.perm_read}
              />
              <RHFCheckbox
                name="perm_write"
                control={control}
                className="text-blue-600"
                displayName="WRITE"
                error={errors.perm_write}
              />
              <RHFCheckbox
                displayName="DELETE"
                className="text-red-600"
                name="perm_delete"
                control={control}
                error={errors.perm_delete}
              />
            </div>
          </div>
          {isEdit && (
            <div className="-mt-2 text-muted-foreground text-sm">
              Enter a new password to change it, or leave it blank to keep the
              current password.
            </div>
          )}
          <div className="col-span-3 mt-6 flex justify-between">
            <div className="flex gap-4">
              <Button type="button" onClick={() => reset()} variant="outline">
                Reset
              </Button>
              {isEdit && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => reset()}
                >
                  Delete
                </Button>
              )}
            </div>
            <LoadingButton loading={isSubmitting} type="submit">
              Submit
            </LoadingButton>
          </div>
        </div>
      </Card>
    </Form>
  );
}
