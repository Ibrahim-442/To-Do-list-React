import React, { useContext, useMemo, useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { UserContext } from "../../context.tsx";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATE_COLORS: Record<string, string> = {
  Pending: "#F5A623",
  "In Process": "#4A90E2",
  Completed: "#3EBD62",
};

const LEGEND: { label: string; color: string }[] = [
  { label: "Pending", color: STATE_COLORS.Pending },
  { label: "In Process", color: STATE_COLORS["In Process"] },
  { label: "Completed", color: STATE_COLORS.Completed },
];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function parseTaskDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

type Props = {
  selected?: Date;
  onSelectDate?: (date: Date) => void;
};

export default function Cale({ selected: selectedProp, onSelectDate }: Props) {
  const ctx = useContext(UserContext);
  const tasks = ctx?.SaveT ?? [];

  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [internalSelected, setInternalSelected] = useState<Date>(today);

  const selected = selectedProp ?? internalSelected;
  const setSelected = (date: Date) => {
    setInternalSelected(date);
    onSelectDate?.(date);
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const goPrev = () => setViewDate(new Date(year, month - 1, 1));
  const goNext = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => {
    const t = new Date();
    setViewDate(new Date(t.getFullYear(), t.getMonth(), 1));
    setSelected(t);
  };

  const gridDays = useMemo(() => {
    const firstOfMonth = new Date(year, month, 1);
    const startWeekday = firstOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: { date: Date; inMonth: boolean }[] = [];

    for (let i = startWeekday - 1; i >= 0; i--) {
      cells.push({ date: new Date(year, month, -i), inMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(year, month, d), inMonth: true });
    }
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date;
      cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false });
    }
    return cells;
  }, [year, month]);

  const statusesByDay = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const task of tasks) {
      const d = parseTaskDate(task.Date);
      if (!d) continue;
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map.has(key)) map.set(key, new Set());
      map.get(key)!.add(task.State);
    }
    return map;
  }, [tasks]);

  const getDayStates = (d: Date): string[] => {
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    return Array.from(statusesByDay.get(key) ?? []);
  };

  return (
 <div className="w-full max-w-4xl mx-auto rounded-2xl border border-gray-100 bg-white px-3 py-4 sm:px-5 sm:py-4 lg:px-6 shadow-sm">

  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

    <div className="flex items-center gap-2">
      <CalendarIcon
        className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-600 shrink-0"
        strokeWidth={2}
      />

      <h2 className="text-sm sm:text-base font-semibold text-gray-900">
        Calendar
      </h2>
    </div>

    <div className="flex items-center gap-2 sm:gap-3">
      <button
        onClick={goPrev}
        aria-label="Previous month"
        className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors shrink-0"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <span className="text-sm font-semibold text-gray-900 w-28 sm:w-32 text-center">
        {MONTH_NAMES[month]} {year}
      </span>

      <button
        onClick={goNext}
        aria-label="Next month"
        className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors shrink-0"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>

    <button
      onClick={goToday}
      className="
        cursor-pointer
        transition-all
        bg-indigo-600
        text-white
        px-5 sm:px-6
        py-2
        rounded-lg
        border-indigo-800
        border-b-[4px]
        hover:brightness-110
        hover:-translate-y-[1px]
        hover:border-b-[6px]
        active:border-b-[2px]
        active:brightness-90
        active:translate-y-[2px]
        text-sm sm:text-base
        w-full
        md:basis-full
        lg:w-auto
        lg:basis-auto
        lg:ml-2
      "
    >
      Today
    </button>

  </div>

  <div className="grid grid-cols-7 mb-2">
    {DAY_NAMES.map((d) => (
      <div
        key={d}
        className="text-center text-[10px] sm:text-xs font-medium text-gray-400"
      >
        {d}
      </div>
    ))}
  </div>

  <div className="grid grid-cols-7 gap-y-1 sm:gap-y-1.5">
    {gridDays.map(({ date, inMonth }, i) => {
      const isSelected = sameDay(date, selected);
      const states = getDayStates(date);

      return (
        <button
          key={i}
          onClick={() => setSelected(date)}
          className="flex flex-col items-center justify-start gap-0.5 py-1 sm:py-1.5 min-w-0"
        >
          <span
            className={[
              "flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm transition-colors",
              isSelected
                ? "bg-indigo-600 text-white font-semibold"
                : inMonth
                ? "text-gray-800"
                : "text-gray-300",
            ].join(" ")}
          >
            {date.getDate()}
          </span>

          <span className="flex gap-0.5 h-1.5">
            {states.slice(0, 3).map((s, idx) => (
              <span
                key={idx}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: STATE_COLORS[s] ?? "#4A90E2",
                }}
              />
            ))}
          </span>
        </button>
      );
    })}
  </div>

  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 mt-3 pt-3 border-t border-gray-100">
    {LEGEND.map(({ label, color }) => (
      <div key={label} className="flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />

        <span className="text-[10px] sm:text-xs text-gray-600">
          {label}
        </span>
      </div>
    ))}
  </div>

</div>
  );
}