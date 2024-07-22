import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "~/lib/utils";
import { format } from "date-fns/format";

type RHFDatePickerProps<T extends FieldValues> = {
  error?: FieldError;
  type?: string;
  displayName?: string;
  id?: string;
  control: Control<T>;
  name: Path<T>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

const DatePicker = ({
  date,
  onChange,
}: {
  date: Date | undefined;
  onChange: () => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
};

export const RHFDatePicker = <T extends FieldValues>({
  control,
  name,
  className,
  displayName,
  error,
}: RHFDatePickerProps<T>) => {
  return (
    <div className={className}>
      <Label htmlFor={name}>
        {displayName ?? name.charAt(0).toUpperCase() + name.slice(1)}
      </Label>
      <div className="flex mt-1.5">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <DatePicker onChange={onChange} date={value} />
          )}
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm mt-1.5">
          {error.message ?? "Required"}
        </div>
      )}
    </div>
  );
};

RHFDatePicker.displayName = "RHFDatePicker";
