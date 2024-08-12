import { Link, useLocation, useNavigation } from "@remix-run/react";
import { type VariantProps, cva } from "class-variance-authority";
import {
  Briefcase,
  Calendar,
  Clipboard,
  File,
  FileIcon,
  FileText,
  FolderClosed,
  FolderOpen,
  Mail,
  PiggyBank,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type Category = {
  id: string;
  title: string;
  color: string;
  url?: string;
  iconURL?: string;
};

const getIconByCategoryName = (iconName: string) => {
  switch (iconName) {
    case "payslips":
      return FileText;
    case "letters":
      return Mail;
    case "finance":
      return PiggyBank;
    case "contracts":
      return File;
    case "calendars":
      return Calendar;
    case "documentation":
      return Clipboard;
    case "job-postings":
      return Briefcase;
    case "training-materials":
      return FileText; // Reusing the same icon for simplicity
    case "exit-forms":
      return FileText; // Reusing the same icon for simplicity
    case "employee-records":
      return UserCheck;
    default:
      return FileIcon;
  }
};

export const categories: Category[] = [
  {
    id: "payslips",
    title: "Payslips",
    color: "rgb(34, 193, 195)",
  },
  {
    id: "letters",
    title: "Letters",
    color: "rgb(255, 87, 34)",
  },
  {
    id: "finance",
    title: "Finance",
    color: "rgb(33, 150, 243)",
  },
  {
    id: "contracts",
    title: "Contracts",
    color: "rgb(96, 125, 139)",
  },
  {
    id: "calendars",
    title: "Calendars",
    color: "rgb(76, 175, 80)",
  },
  {
    id: "documentation",
    title: "Documentation",
    color: "rgb(255, 193, 7)",
  },
  {
    id: "training-materials",
    title: "Training Materials",
    color: "rgb(0, 188, 212)",
  },
  {
    id: "exit-forms",
    title: "Exit Forms",
    color: "rgb(239, 83, 80)",
  },
].sort((a, b) => (a.title.length < b.title.length ? 1 : -1));

type Props = {
  categories: Category[];
  title: string;
};

// TODO chore: convert rgb to hex for easier alpha change

const categoryVars = cva(
  "will-change-transform relative text-sm select-none flex cursor-pointer items-center gap-3 transition-[filter,transform,shadow,background-color,color]",
  {
    variants: {
      compact: {
        relaxed: "border-2 px-4 py-3 rounded-md",
        tight:
          "px-5 py-4 bg-secondary hover:bg-primary hover:text-primary-foreground",
      },
      hover: {
        normal:
          "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
        fancy: "hover:rotate-1 hover:scale-95 hover:opacity-70",
        grayscale:
          "data-[active=true]:grayscale-0 hover:grayscale-0 grayscale hover:scale-[0.98] data-[active=true]:-translate-y-1 data-[active=true]:shadow-lg",
      },
    },
    defaultVariants: { hover: "fancy", compact: "relaxed" },
  },
);

export const CategoryListRaw = ({
  categories,
  compact,
  hover,
}: { categories: Category[] } & VariantProps<typeof categoryVars>) => {
  const { pathname } = useLocation();
  const { location } = useNavigation();
  const isCompact = compact === "tight";

  return categories.map((c) => {
    const url = `/documents/${c.id}`;
    const active = url === (location?.pathname ?? pathname);
    const color20 = c.color.replace("rgb", "rgba").replace(")", ",0.2)");
    const Icon = isCompact
      ? active
        ? FolderOpen
        : FolderClosed
      : getIconByCategoryName(c.id);
    const style = isCompact
      ? {}
      : { backgroundColor: color20, borderColor: color20 };

    return (
      <Link
        to={url}
        key={c.title}
        data-active={active}
        style={style}
        className={categoryVars({ hover, compact })}
      >
        {!isCompact && (
          <div
            className="-top-2 absolute left-0.5 h-2 w-12 rounded-t-md bg-black shadow-sm"
            style={{ backgroundColor: c.color }}
          />
        )}
        <Icon
          className="h-5 w-5"
          style={{ color: isCompact ? undefined : c.color }}
        />
        <div>{c.title}</div>
      </Link>
    );
  });
};

export const DocumentCategoriesCard = ({ title, categories }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-end justify-between">
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4 mt-2 gap-y-6 *:will-change-transform">
          <CategoryListRaw categories={categories} compact="relaxed" />
        </div>
      </CardContent>
    </Card>
  );
};

export const MockedDocumentCategoriesCard = () => (
  <DocumentCategoriesCard {...{ categories, title: "My Document's" }} />
);
