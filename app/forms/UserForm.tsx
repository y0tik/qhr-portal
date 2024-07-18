import { Form, useNavigation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { RHFInput } from "~/components/form/RHFInput";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFCheckbox } from "~/components/form/RHFCheckbox";
import { Label } from "~/components/ui/label";
import { LoadingButton } from "~/components/loading-btn";

const schema = z
  .object({
    username: z.string().min(2),
    email: z.string().email(),
    mode: z.enum(["create", "update"]).default("create"),
    password: z.string().min(2).optional(),
    role_hr: z.boolean().default(false),
    role_support: z.boolean().default(false),
    perm_read: z.boolean().default(false),
    perm_write: z.boolean().default(false),
    perm_delete: z.boolean().default(false),
  })
  .refine((data) => !(data.mode === "create" && !data.password), {
    message: "Password Required",
    path: ["password"],
  });

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
  const isSubmitting = state === "loading" || state === "submitting";
  const isEdit = !!defaultValues;

  return (
    <Form onSubmit={handleSubmit} method="post">
      <Card className="px-6 py-6">
        <div className="grid grid-cols-3 gap-y-4 gap-x-8">
          <RHFInput {...register("username")} error={errors.username} />
          <RHFInput {...register("email")} error={errors.email} />
          <div>
            {!isEdit && (
              <RHFInput {...register("password")} error={errors.password} />
            )}
          </div>
          <div className="mt-3">
            <Label>Role</Label>
            <div className="text-sm text-muted-foreground mt-0.5">
              Choose the roles you wish to assign to this user
            </div>
            <div className="flex mt-4 gap-4">
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
            <div className="text-sm text-muted-foreground mt-0.5">
              Choose the permissions you wish to assign to this user
            </div>
            <div className="flex mt-4 gap-4">
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

          <div className="mt-6 col-span-3 flex justify-between">
            <Button type="button" onClick={() => reset()} variant="outline">
              Reset
            </Button>
            <LoadingButton loading={isSubmitting} type="submit">
              Submit
            </LoadingButton>
          </div>
        </div>
      </Card>
    </Form>
  );
}
