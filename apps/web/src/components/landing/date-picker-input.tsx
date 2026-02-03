"use client";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export default function DatePickerInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="px-5 flex flex-col justify-center border-r border-[#eee] cursor-pointer">
          <label className="text-xs font-bold text-[#888] mb-1 uppercase tracking-wider text-left">
            {label}
          </label>
          <div className="flex items-center gap-2 text-base font-semibold text-venture-black w-full bg-transparent font-[family-name:var(--font-outfit)]">
            {value ? (
              format(value, "P")
            ) : (
              <span className="font-semibold text-[#999]">{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
