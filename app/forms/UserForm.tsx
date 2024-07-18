import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { RHFInput } from "~/components/form/RHFInput";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFCheckbox } from "~/components/form/RHFCheckbox";
import { Label } from "~/components/ui/label";
import { checkbox } from "~/lib/utils";

const schema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(2),
  role_hr: checkbox(),
  role_support: checkbox(),
  perm_read: checkbox(),
  perm_write: checkbox(),
  perm_delete: checkbox(),
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
    formState: { errors },
    register,
    reset,
  } = useRemixForm<UserFormData>({ defaultValues, resolver: userResolver });

  return (
    <Form onSubmit={handleSubmit} method="post">
      <Card className="px-6 py-6">
        <div className="grid grid-cols-3 gap-y-4 gap-x-8">
          <RHFInput {...register("username")} error={errors.username} />
          <RHFInput {...register("email")} error={errors.email} />
          <RHFInput {...register("password")} error={errors.password} />

          <div>
            <Label>Role</Label>
            <div className="text-sm text-muted-foreground mt-0.5">
              Choose the roles you wish to assign to this user
            </div>
            <div className="flex mt-4 gap-4">
              <RHFCheckbox
                {...register("role_hr")}
                displayName="HR"
                error={errors.role_hr}
              />
              <RHFCheckbox
                {...register("role_support")}
                displayName="SUPPORT"
                error={errors.role_support}
              />
            </div>
          </div>

          <div>
            <Label>Permissions</Label>
            <div className="text-sm text-muted-foreground mt-0.5">
              Choose the permissions you wish to assign to this user
            </div>
            <div className="flex mt-4 gap-4">
              <RHFCheckbox
                {...register("perm_read")}
                displayName="READ"
                className="text-green-600"
                error={errors.perm_read}
              />
              <RHFCheckbox
                {...register("perm_write")}
                className="text-blue-600"
                displayName="WRITE"
                error={errors.perm_write}
              />
              <RHFCheckbox
                displayName="DELETE"
                className="text-red-600"
                {...register("perm_delete")}
                error={errors.perm_delete}
              />
            </div>
          </div>

          <div className="mt-6 col-span-3 flex justify-between">
            <Button type="button" onClick={() => reset()} variant="outline">
              Reset
            </Button>
            <Button>Submit</Button>
          </div>
        </div>
      </Card>
    </Form>
  );
}
