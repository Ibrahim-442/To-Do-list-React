import React, { useContext, useMemo } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { UserContext } from "../../context.tsx";
import EditTask from"../Tasks/main/EditTask.tsx";
import { motion } from "framer-motion";


const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const STATE_STYLES: Record<string, { bg: string; text: string }> = {
  Pending: { bg: "#FEF9C3", text: "#CA8A04" },
  "In Progress": { bg: "#DBEAFE", text: "#1D4ED8" },
  Completed: { bg: "#E6F7EC", text: "#2F855A" },
  
};

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function parseTaskDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}


type Props = {
  date?: Date;
  onViewAll?: () => void;
};

export default function DayTasks({ date }: Props) {
      const { SaveT, setSaveT, setopenedit, editT, seteditT } =
    useContext(UserContext)!;
  const ctx = useContext(UserContext);
  const tasks = ctx?.SaveT ?? [];
  const targetDate = date ?? new Date();

  const dayTasks = useMemo(() => {
    return tasks
      .map((t) => ({ ...t, _date: parseTaskDate(t.Date) }))
      .filter((t) => t._date && sameDay(t._date, targetDate))
      .sort((a, b) => (a._date!.getTime() - b._date!.getTime()));
  }, [tasks, targetDate]);

  const title = `${WEEKDAY_NAMES[targetDate.getDay()]}, ${MONTH_NAMES[targetDate.getMonth()]} ${targetDate.getDate()}`;

  const openedit = (id: number) => {
    const taskedit = SaveT.find((item) => item.id === id);
    if (taskedit) {
      seteditT(taskedit);
      setopenedit(true);
    }
  };

  const delItem = (i: number) => {
    setSaveT((prev)=>prev.filter((item)=>item.id !== i));
  };
  return (
 <div className="w-full max-w-2xl mx-auto rounded-2xl border border-gray-100 bg-white px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <CalendarIcon className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" strokeWidth={2} />
      <h2 className="text-sm sm:text-base font-semibold text-gray-900">Tasks for {title}</h2>
    </div>
    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
      {dayTasks.length}
    </span>
  </div>

  <div className="flex flex-col gap-3 overflow-x-hidden">
    {dayTasks.length === 0 && (
      <p className="text-sm text-gray-400 text-center py-6">No Tasks for this day.</p>
    )}

    {dayTasks
  .sort((a, b) => {
    if (a.State === "Completed" && b.State !== "Completed") return 1;
    if (a.State !== "Completed" && b.State === "Completed") return -1;
    return 0;
  })
  .map((task) => {
      const style = STATE_STYLES[task.State] ?? { bg: "#4A90E2", text: "white" };
      return (
             <motion.div
        key={task.id}
        layout
        transition={{
          layout: {
            duration: 0.7,
            ease: "easeInOut",
          },
        }}
        className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-100 px-4 py-3"
      >

          <div className="cont shrink-0">
            <input
              type="checkbox"
              id={`d${task.id}`}
              style={{ display: "none" }}
              className="task-checkbox"
              onClick={(e) => e.stopPropagation()}
              checked={task.State === "Completed"}
              onChange={() => {
                setSaveT((prev) =>
                  prev.map((ite) =>
                    ite.id === task.id
                      ? ite.State === "Completed"
                        ? { ...ite, State: ite.previousState || "Pending" }
                        : { ...ite, previousState: ite.State, State: "Completed" }
                      : ite
                  )
                );
              }}
            />
            <label htmlFor={`d${task.id}`} className="check">
              <svg width="18px" height="18px" viewBox="0 0 18 18">
                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                <polyline points="1 9 7 14 15 4"></polyline>
              </svg>
            </label>
          </div>

          <div className="flex-1 min-w-[140px] basis-40">
            <p
              className={`${
                task.State === "Completed" ? "text-green-600 font-medium "
        : "text-gray-800 font-semibold"
              } text-sm sm:text-md font-medium text-gray-900 break-words`}
            >
              {task.name}
            </p>
            <p className="text-xs text-gray-400 break-words">{task.describe}</p>
          </div>

          <span
            className="shrink-0 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap"
            style={{ backgroundColor: style.bg, color: style.text }}
          >
            {task.State}
          </span>

          <button aria-label="More options" className="p-1 rounded-full text-gray-400 transition-colors shrink-0">
            <div className="d-flex gap-3">
              <button
                onClick={() => openedit(task.id)}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
              >
                <i className="bi bi-pencil text-lg sm:text-xl text-gray-800"></i>
              </button>
              {editT && <EditTask />}
              <button
                onClick={() => delItem(task.id)}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
              >
                <i className="bi bi-trash3 text-red-600 text-lg sm:text-xl"></i>
              </button>
            </div>
          </button>
        </motion.div>
      );
    })}
  </div>
</div>
  );
}