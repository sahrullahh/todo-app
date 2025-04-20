'use client';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function DueDatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'flex w-full items-center justify-start rounded-md border px-3 py-2 text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </>
  );
}
