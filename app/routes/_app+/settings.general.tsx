import { UpdatePersonalEmailFormCard } from "../action+/update-personal-email";

export default function UserSettingsIndexPage() {
  return (
    <div className="grid gap-8">
      <UpdatePersonalEmailFormCard />
    </div>
  );
}
