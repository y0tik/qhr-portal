import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

// export common cell components

export const UserNameWithAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((e) => e[0])
    .splice(0, 2);
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="" alt="@admin" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span className="capitalize">{name}</span>
    </div>
  );
};
