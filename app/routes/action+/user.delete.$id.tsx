import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { json, useFetcher } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ConfirmDialog } from "~/components/ui/confirm-dialog";
import { LoadingButton } from "~/components/ui/loading-btn";
import { sleep } from "~/lib/utils";
import { requireAuth } from "~/server/auth-session.server";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const id = params.id;
  invariant(id, "hr user account id is required");

  await sleep(2000);
  const { session, api } = await requireAuth(request, ["delete:users"]);
  const { error } = await api.delete(`/hr/${id}`, true);
  if (error) {
    session.flash("message", {
      message: "Cannot delete HR_USER, please try again later or contact us",
      type: "error",
    });
    return json({
      message: "Cannot delete HR_USER, please try again later or contact us",
      type: "error",
    });
  }
  return redirect("/user");
};

export const ActionDeleteHRUser = ({ id }: { id: string }) => {
  const fetcher = useFetcher<typeof action>();
  return (
    <ConfirmDialog
      alert={{
        message: fetcher.data?.message ?? "",
        type: fetcher.data?.type === "error" ? "error" : "success",
      }}
      action={
        <LoadingButton
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            fetcher.submit(null, {
              method: "POST",
              action: `/action/user/delete/${id}`,
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
