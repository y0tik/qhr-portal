import { Link } from "@remix-run/react";
import {
  FileText,
  Mail,
  Calendar,
  Clipboard,
  File,
  LucideIcon,
  PiggyBank,
} from "lucide-react";
import { Card, CardContent, CardTitle, CardHeader } from "~/components/ui/card";

type Category = {
  id: string;
  title: string;
  icon: LucideIcon;
  color: (alpha?: number) => string;
};

const categories: Category[] = [
  {
    id: "payslips",
    title: "Payslips",
    icon: FileText,
    color: (alpha = 0.3) => `rgba(34, 193, 195, ${alpha} )`,
  },
  {
    id: "letters",
    title: "Letters",
    icon: Mail,
    color: (alpha = 0.3) => `rgba(255, 87, 34, ${alpha} )`,
  },
  {
    id: "finance",
    title: "Finance",
    icon: PiggyBank,
    color: (alpha = 0.3) => `rgba(33, 150, 243, ${alpha} )`,
  },
  {
    id: "contracts",
    title: "Contracts",
    icon: File,
    color: (alpha = 0.3) => `rgba(96, 125, 139, ${alpha} )`,
  },
  {
    id: "calendars",
    title: "Calendars",
    icon: Calendar,
    color: (alpha = 0.3) => `rgba(76, 175, 80, ${alpha} )`,
  },
  {
    id: "documentation",
    title: "Documentation",
    icon: Clipboard,
    color: (alpha = 0.3) => `rgba(255, 193, 7, ${alpha} )`,
  },
  // {
  //   id: "job-postings",
  //   title: "Job Postings",
  //   icon: Briefcase,
  //   () =>color: "rgba(255, 64, 129, ) // Pink
  // },
  {
    id: "training-materials",
    title: "Training Materials",
    icon: FileText, // Reusing the same icon for simplicity
    color: (alpha = 0.3) => `rgba(0, 188, 212, ${alpha} )`,
  },
  {
    id: "exit-forms",
    title: "Exit Forms",
    icon: FileText, // Reusing the same icon for simplicity
    color: (alpha = 0.3) => `rgba(239, 83, 80, ${alpha} )`,
  },
  // {
  //   id: "employee-records",
  //   title: "Employee Records",
  //   icon: UserCheck,
  //   () =>color: "rgba(156, 39, 176, ) // Palpha = 0.3urple
].sort((a, b) => (a.title.length < b.title.length ? 1 : -1));

type Props = {
  categories: Category[];
  title: string;
};

const DocumentCategoriesCard = ({ title, categories }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-end">
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-4">
          {categories.map((c) => (
            <Link
              to={`/documents/${c.id}`}
              key={c.title}
              style={{
                backgroundColor: c.color(0.2),
                borderColor: c.color(0.2),
              }}
              className="px-4 py-3 mt-3 relative shadow-lg hover:rotate-1 hover:scale-95 transition-transform hover:opacity-70 cursor-pointer flex items-center gap-2 rounded-md border-2 col-span-12 md:col-span-6 lg:col-span-4"
            >
              <div
                className="bg-black absolute -top-2 h-2 left-0.5 rounded-t-md shadow-sm w-12"
                style={{ backgroundColor: c.color(1) }}
              ></div>
              <c.icon className="w-5 h-5" style={{ color: c.color(1) }} />
              <div>{c.title}</div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const MockedDocumentCategoriesCard = () => (
  <DocumentCategoriesCard {...{ categories, title: "My Document's" }} />
);
