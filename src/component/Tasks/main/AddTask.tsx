import { useContext } from "react";

import { UserContext } from "../../../context.tsx";
export default function AddTask() {
  const { Tasks, setTasks, SaveT, setSaveT, SetOpen, Open } =
    useContext(UserContext)!;
  const addbotton = () => {
    const newId =
      SaveT.length > 0 ? Math.max(...SaveT.map((item) => item.id)) + 1 : 1;

    const newTask = {
      ...Tasks,
      id: newId,
    };

    setSaveT((prev) => [...prev, newTask]);

    setTasks({
      id: newId,
      name: "",
      describe: "",
      priority: "",
      State: "Pending",
      Date: "",
    });
  };
  const cancelbtn = () => {
    setTasks({
      ...Tasks,
      name: "",
      describe: "",
      priority: "",
      State: "Pending",
      Date: "",
    });
  };

  return (
    <div className={`overlay ${Open ? "show" : ""}`} tabIndex={-1}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          addbotton();
          SetOpen(false);
        }}
        className="w-full flex justify-center"
      >
        <div
          className="bg-white m-5 p-5 rounded-4xl shadow-cyan-900 shadow-xl/30
      w-[min(700px,calc(100%-2rem))]
      max-sm:m-3
      max-sm:p-4
      max-sm:rounded-2xl
      max-sm:w-[92%]
      max-sm:mx-auto
      max-h-[90vh]
      overflow-y-auto"
        >
          <div className="flex justify-center items-center">
            <h2 className="CreateTask text-center">Create a New Task</h2>
          </div>

          <div className="mb-3">
            <label htmlFor="taskTitle" className="form-label">
              Task Title
            </label>

            <input
              type="text"
              name="name"
              id="taskTitle"
              className="form-control w-full"
              placeholder="e.g. Study , Gym"
              value={Tasks.name}
              onChange={(e) => setTasks({ ...Tasks, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Description" className="form-label">
              Description
            </label>

            <textarea
              id="Description"
              name="describe"
              className="form-control w-full min-h-[100px] resize-y"
              placeholder="Add more details about your task..."
              value={Tasks.describe}
              onChange={(e) => setTasks({ ...Tasks, describe: e.target.value })}
              required
            />
          </div>

<div className="mb-3 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
  <div className="w-[140px] sm:w-[170px]">
    <label htmlFor="priority" className="prioand form-label">
      priority
    </label>

    <select
      className="form-select !w-[140px] sm:!w-[170px] prioandDate"
      id="priority"
      name="priority"
      value={Tasks.priority}
      onChange={(e) =>
        setTasks({ ...Tasks, priority: e.target.value })
      }
      required
    >
      <option value="" hidden></option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>

  <div className="w-[140px] sm:w-[170px]">
    <label htmlFor="Date" className="form-label">
      Due Date
    </label>

    <input
      type="date"
      id="Date"
      name="Date"
      className="form-control !w-[140px] sm:!w-[170px] prioandDate"
      value={Tasks.Date}
      onChange={(e) =>
        setTasks({ ...Tasks, Date: e.target.value })
      }
      required
    />
  </div>
</div>
          <div className="flex justify-center items-center gap-2.5 max-sm:flex-col max-sm:w-full">
            <button className="savebtn" type="submit">
              <span className="text">Save</span>

              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6l-4-4zm-6 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H6V4h9v4z"></path>
                </svg>
              </span>
            </button>

            <button
              className="noselect"
              type="button"
              onClick={() => {
                SetOpen(false);
                cancelbtn();
              }}
            >
              <span className="text">Cancel</span>

              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
