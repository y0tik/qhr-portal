import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { MenuItem } from "~/types";

export function MainNav({
  className,
  links,
  ...props
}: React.HTMLAttributes<HTMLElement> & { links: MenuItem[] }) {
  const { pathname } = useLocation();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((l) => (
        <Link
          key={`link-${l.name}`}
          to={l.to}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            l.to === pathname ? "text-primary" : "text-muted-foreground"
          )}
        >
          {l.name}
        </Link>
      ))}
    </nav>
  );
}
