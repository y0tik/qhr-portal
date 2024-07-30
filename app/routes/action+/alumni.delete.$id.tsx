import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { json, useFetcher } from "@remix-run/react";
import { LoadingButton } from "~/components/ui/loading-btn";
import { requireAuth } from "~/server/auth-session.server";
import invariant from "tiny-invariant";
import { ConfirmDialog } from "~/components/ui/confirm-dialog";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const { session, api } = await requireAuth(request, ["delete:alumni"]);
  const id = params.id;
  invariant(id, "alumni user account id is required");

  const { error } = await api.delete(`/employees/${id}`);
  if (error) {
    session.flash("message", {
      message:
        "Cannot delete alumni_user, please try again later or contact us",
      type: "error",
    });
    return json({
      message:
        "Cannot delete alumni_user, please try again later or contact us",
      type: "error",
    });
  }
  return redirect("/alumni");
};

export const ActionDeleteAlumniUser = ({ id }: { id: string }) => {
  const fetcher = useFetcher<typeof action>();
  return (
    <ConfirmDialog
      alert={{
        message: fetcher.data?.message ?? "",
        type: fetcher.data?.type == "error" ? "error" : "success",
      }}
      action={
        <LoadingButton
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            fetcher.submit(null, {
              method: "POST",
              action: `/action/alumni/delete/${id}`,
            });
          }}
          loading={fetcher.state !== "idle"}
        >
          Yes
        </LoadingButton>
      }
    />
  );
};
