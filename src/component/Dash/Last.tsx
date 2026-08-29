import React, { useState } from "react";
import Calendar from "./Cale";
import TasksForDay from "./DayTasks";

export default function Last() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mt-3 rounded-2xl shadow-2xl bg-white p-4 w-full">
  <div className="w-full min-w-0">
    <Calendar
      selected={selectedDate}
      onSelectDate={setSelectedDate}
    />
  </div>

  <div className="w-full min-w-0">
    <TasksForDay date={selectedDate} />
  </div>
</div>
  );
}