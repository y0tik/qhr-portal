import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// export common cell components

export const UserNameWithAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((e) => e[0])
    .splice(0, 2);
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="h-8 w-8">
        <AvatarImage src="" alt="@admin" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span className="capitalize">{name}</span>
    </div>
  );
};
