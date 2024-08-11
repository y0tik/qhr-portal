import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData, useNavigation } from "@remix-run/react";
import { DownloadIcon, EyeIcon, SortAsc, TimerIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/loading-btn";
import { dateToFullString, sleep } from "~/lib/utils";

const mockFilesByCategory: Record<string, File[]> = {
  payslips: [
    {
      name: "payslip_jan.pdf",
      url: "https://example.com/payslip_jan.pdf",
      created_at: "2024-01-01T12:00:00Z",
    },
    {
      name: "payslip_feb.pdf",
      url: "https://example.com/payslip_feb.pdf",
      created_at: "2024-02-01T12:00:00Z",
    },
  ],
  letters: [
    {
      name: "letter_from_boss.pdf",
      url: "https://example.com/letter_from_boss.pdf",
      created_at: "2024-03-01T12:00:00Z",
    },
    {
      name: "recommendation_letter.docx",
      url: "https://example.com/recommendation_letter.docx",
      created_at: "2024-03-15T12:00:00Z",
    },
  ],
  finance: [
    {
      name: "financial_report_q1.xlsx",
      url: "https://example.com/financial_report_q1.xlsx",
      created_at: "2024-04-01T12:00:00Z",
    },
    {
      name: "budget_plan.pdf",
      url: "https://example.com/budget_plan.pdf",
      created_at: "2024-04-15T12:00:00Z",
    },
  ],
  contracts: [
    {
      name: "contract_employee.pdf",
      url: "https://example.com/contract_employee.pdf",
      created_at: "2024-05-01T12:00:00Z",
    },
    {
      name: "contract_vendor.pdf",
      url: "https://example.com/contract_vendor.pdf",
      created_at: "2024-05-15T12:00:00Z",
    },
  ],
  calendars: [
    {
      name: "2024_calendar.pdf",
      url: "https://example.com/2024_calendar.pdf",
      created_at: "2024-06-01T12:00:00Z",
    },
    {
      name: "2024_wall_calendar.jpg",
      url: "https://example.com/2024_wall_calendar.jpg",
      created_at: "2024-06-15T12:00:00Z",
    },
  ],
  documentation: [
    {
      name: "user_guide.pdf",
      url: "https://example.com/user_guide.pdf",
      created_at: "2024-07-01T12:00:00Z",
    },
    {
      name: "api_documentation.docx",
      url: "https://example.com/api_documentation.docx",
      created_at: "2024-07-15T12:00:00Z",
    },
  ],
  "training-materials": [
    {
      name: "training_manual.pdf",
      url: "https://example.com/training_manual.pdf",
      created_at: "2024-08-01T12:00:00Z",
    },
    {
      name: "workshop_presentation.pptx",
      url: "https://example.com/workshop_presentation.pptx",
      created_at: "2024-08-15T12:00:00Z",
    },
  ],
  "exit-forms": [
    {
      name: "exit_interview_form.pdf",
      url: "https://example.com/exit_interview_form.pdf",
      created_at: "2024-09-01T12:00:00Z",
    },
    {
      name: "resignation_letter.docx",
      url: "https://example.com/resignation_letter.docx",
      created_at: "2024-09-15T12:00:00Z",
    },
  ],
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const categoryName = params.category;
  if (!categoryName) return redirect("/documents");
  await sleep(2000);
  const files: File[] = mockFilesByCategory[categoryName] ?? [];
  return json({ name: categoryName, files });
};

type File = {
  name: string;
  url: string;
  created_at: string;
};

export const FileListItem = ({ name, url, created_at }: File) => {
  return (
    <a
      href={url}
      className="flex justify-between border px-5 py-4 rounded-md border-b-4 hover:bg-secondary transition-colors hover:border-b-primary"
    >
      <div>
        <div>{name}</div>
        <div className="text-xs space-y-1 mt-2">
          <div className="text-xs text-muted-foreground">uploaded at</div>
          <div>{dateToFullString(created_at)}</div>
        </div>
      </div>
      <div className="space-x-2">
        <Button size="sm-icon" variant="outline">
          <EyeIcon className="w-4 h-4" />
        </Button>
        <Button size="sm-icon">
          <DownloadIcon className="w-4 h-4" />
        </Button>
      </div>
    </a>
  );
};

export const FilesListRaw = ({ files }: { files: File[] }) => {
  return files.map((f) => <FileListItem key={f.url} {...f} />);
};

export default function DocumentCategoryListView() {
  const { name, files } = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-end">
        <div>
          Showing all files for category :{" "}
          <b className="text-primary">{name}</b>
        </div>
        <div>
          {/* TODO make this functioning */}
          <Button size="sm-icon">
            <SortAsc className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid relative gap-4 rounded-md grid-cols-3 p-4 bg-secondary/30 shadow-inner">
        {state === "loading" && (
          <div className="absolute inset-0 flex justify-center items-center bg-primary/50 rounded-md">
            <Spinner className="w-8 h-8" />
          </div>
        )}
        <FilesListRaw files={files} />
      </div>
    </div>
  );
}
