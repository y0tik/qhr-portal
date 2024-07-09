import { useLocation } from "@remix-run/react";
import BreadcrumbHelper from "./ui/breadcrumb-helper";

export default function AutoBreadcrumb() {
  // use this and not window. to allow SSG
  const location = useLocation();
  const crumbs = location.pathname.split("/");

  const navLinks = crumbs.map((c, i) => {
    return {
      name: c.charAt(0).toUpperCase() + c.slice(1),
      to: [...crumbs.slice(0, i + 1)].join("/"),
    };
  });

  // replace last and first
  navLinks[0].name = "Overview";
  navLinks[0].to = "/overview";
  navLinks[navLinks.length - 1].to = "";

  return (
    <div className="py-4">
      <BreadcrumbHelper items={navLinks} />
    </div>
  );
}
