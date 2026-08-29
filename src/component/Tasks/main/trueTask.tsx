import { UserContext } from "../../../context.tsx";
import { useContext, useState } from "react";
import EditTask from "./EditTask.tsx";
import { motion } from "framer-motion";
export default function TrueTask() {
  const { SaveT, setSaveT, setopenedit, editT, seteditT } =
    useContext(UserContext)!;
  const [priority, setPriority] = useState<string>("All");
  const [StateF, setStateF] = useState<string>("All");

  const openedit = (id: number) => {
    const taskedit = SaveT.find((item) => item.id === id);
    if (taskedit) {
      seteditT(taskedit);
      setopenedit(true);
    }
  };

  const delItem = (i: number) => {
    setSaveT((prev) => prev.filter((item) => item.id !== i));
  };

  const filterPrio = (prio: string) => {
    setPriority(prio);
  };
  const filterSta = (sta: string) => {
    setStateF(sta);
  };

  return (
    <div>
      <div className="grid grid-cols-2 justify-center gap-4 sm:flex sm:gap-15 mt-4">
        <div className="min-w-0">
          <select
            className="form-select selectChose pr-5  w-48"
            id="priority"
            onChange={(e) => filterPrio(e.target.value)}
          >
            <option value="All">priority: All</option>
            <option value="low">priority: Low</option>
            <option value="medium">priority: Medium</option>
            <option value="high">priority: High</option>
          </select>
        </div>
        <div className="pl-7 min-w-0">
          <select
            className="form-select selectChose  w-48"
            id="State"
            onChange={(e) => filterSta(e.target.value)}
          >
            <option value="All">State: All</option>
            <option value="Pending">State: Pending</option>
            <option value="In Progress">State: In Progress</option>
            <option value="Completed">State: Completed</option>
          </select>
        </div>
      </div>
<div className="w-full">
  <div className="hidden sm:block rounded-2xl shadow-2xl overflow-hidden mt-3">
    <div className="overflow-x-auto">
      <table className="table mb-0 w-full">
        <thead>
          <tr className="h-[60px] align-middle">
            <th scope="col" style={{ width: "1%" }}></th>
            <th scope="col" style={{ width: "33%" }}>
              Task
            </th>
            <th scope="col">
              <span className="mr-6"></span>Priority
            </th>
            <th scope="col">
              <span className="mr-7"></span>Status
            </th>
            <th scope="col">
              <span className="mr-5"></span>Due Date
            </th>
            <th scope="col">
              <span className="mr-5"></span>Actions
            </th>
          </tr>
        </thead>
        <tbody className="overflow-x-hidden">
          {SaveT.filter(
            (item) =>
              (priority === "All" || item.priority === priority) &&
              (StateF === "All" || item.State === StateF),
          )
            .sort((a, b) => {
              if (a.State === "Completed" && b.State !== "Completed") return 1;
              if (a.State !== "Completed" && b.State === "Completed") return -1;
              return 0;
            })
            .map((data) => {
              const checkboxId = `cbx-${data.id}`;

              return (
                <motion.tr
                  className="h-[60px]"
                  layout
                  key={data.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    layout: {
                      duration: 0.7,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <td scope="row" className="align-middle">
                    <div className="container transition-all duration-700">
                      <input
                        type="checkbox"
                        id={checkboxId}
                        style={{ display: "none" }}
                        className="task-checkbox"
                        onClick={(e) => e.stopPropagation()}
                        checked={data.State === "Completed"}
                        onChange={() => {
                          setSaveT((prev) =>
                            prev.map((ite) =>
                              ite.id === data.id
                                ? ite.State === "Completed"
                                  ? {
                                      ...ite,
                                      State: ite.previousState || "Pending",
                                    }
                                  : {
                                      ...ite,
                                      previousState: ite.State,
                                      State: "Completed",
                                    }
                                : ite,
                            ),
                          );
                        }}
                      />
                      <label htmlFor={checkboxId} className="check">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                          <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                      </label>
                    </div>
                  </td>
                  <td>
                    <p
                      className={`text-2xl mb-0 ${
                        data.State === "Completed"
                          ? "text-green-600 font-medium"
                          : "text-gray-800 font-semibold"
                      }`}
                    >
                      {data.name}
                    </p>
                    <p className="describe text-lg">{data.describe}</p>
                  </td>
                  <td className="align-middle">
                    <span
                      className={`w-28 h-10 align-middle justify-center inline-flex items-center px-4 py-2 border rounded-xl text-lg font-semibold ${
                        data.priority === "low"
                          ? "border-green-200 text-green-700 bg-green-100"
                          : data.priority === "medium"
                            ? "border-orange-200 text-orange-700 bg-orange-100"
                            : "border-red-200 text-red-700 bg-red-100"
                      }`}
                    >
                      {data.priority}
                    </span>
                  </td>
                  <td className="align-middle">
                    <span
                      className={`w-28 h-10 align-middle justify-center inline-flex items-center px-4 py-2 border rounded-xl text-lg font-semibold ${
                        data.State === "Completed"
                          ? "border-green-200 text-green-700 bg-green-100"
                          : data.State === "In Progress"
                            ? "border-blue-200 text-blue-700 bg-blue-100 whitespace-nowrap"
                            : "border-yellow-200 text-yellow-600 bg-yellow-100"
                      }`}
                    >
                      {data.State}
                    </span>
                  </td>
                  <td className="align-middle">
                    <i className="bi bi-calendar2 pr-1"></i>
                    {data.Date}
                  </td>
                  <td className="align-middle">
                    <div className="d-flex gap-1">
                      <button
                        onClick={() => openedit(data.id)}
                        className="w-12 h-12 bg-white rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
                      >
                        <i className="bi bi-pencil text-xl text-gray-800"></i>
                      </button>
                      <button
                        onClick={() => delItem(data.id)}
                        className="w-12 h-12 bg-white rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
                        >
                        <i className="bi bi-trash3 text-red-600"></i>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
            {editT && <EditTask />} 
        </tbody>
      </table>
    </div>
  </div>

<div className="sm:hidden flex flex-col gap-3 mt-3 w-full">
    {SaveT.filter(
      (item) =>
        (priority === "All" || item.priority === priority) &&
        (StateF === "All" || item.State === StateF),
    )
      .sort((a, b) => {
        if (a.State === "Completed" && b.State !== "Completed") return 1;
        if (a.State !== "Completed" && b.State === "Completed") return -1;
        return 0;
      })
      .map((data) => {
        const checkboxId = `cbx-mobile-${data.id}`;
        return (
          <motion.div
            key={data.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ layout: { duration: 0.7, ease: "easeInOut" } }}
            className="w-full rounded-xl shadow-md p-4 bg-white box-border"
          >
            <div className="grid grid-cols-[auto_1fr_auto] items-start gap-3 w-full">
              <div className="shrink-0 pt-0.5">
                <input
                  type="checkbox"
                  id={checkboxId}
                  style={{ display: "none" }}
                  className="task-checkbox"
                  onClick={(e) => e.stopPropagation()}
                  checked={data.State === "Completed"}
                  onChange={() => {
                    setSaveT((prev) =>
                      prev.map((ite) =>
                        ite.id === data.id
                          ? ite.State === "Completed"
                            ? {
                                ...ite,
                                State: ite.previousState || "Pending",
                              }
                            : {
                                ...ite,
                                previousState: ite.State,
                                State: "Completed",
                              }
                          : ite,
                      ),
                    );
                  }}
                  />
                <label htmlFor={checkboxId} className="check">
                  <svg width="18px" height="18px" viewBox="0 0 18 18">
                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                  </svg>
                </label>
              </div>

              <div className="w-full min-w-0">
                <p
                  className={`text-base font-semibold leading-normal m-0 block w-full break-words ${
                    data.State === "Completed"
                    ? "text-green-600 line-through opacity-75"
                    : "text-gray-800"
                  }`}
                  >
                  {data.name}
                </p>
                {data.describe && (
                  <p className="describe text-xs text-gray-500 leading-normal m-0 pt-1 block w-full break-words">
                    {data.describe}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openedit(data.id)}
                  className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-200 hover:bg-gray-100"
                  >
                  <i className="bi bi-pencil text-base text-gray-800"></i>
                </button>
                <button
                  onClick={() => delItem(data.id)}
                  className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-200 hover:bg-red-50"
                  >
                  <i className="bi bi-trash3 text-red-600 text-base"></i>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                    data.priority === "low"
                      ? "border-green-200 text-green-700 bg-green-100"
                      : data.priority === "medium"
                        ? "border-orange-200 text-orange-700 bg-orange-100"
                        : "border-red-200 text-red-700 bg-red-100"
                      }`}
                      >
                  {data.priority}
                </span>

                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border whitespace-nowrap ${
                    data.State === "Completed"
                    ? "border-green-200 text-green-700 bg-green-100"
                    : data.State === "In Progress"
                    ? "border-blue-200 text-blue-700 bg-blue-100"
                    : "border-yellow-200 text-yellow-600 bg-yellow-100"
                  }`}
                  >
                  {data.State}
                </span>
              </div>

              <span className="px-2.5 py-1 rounded-lg text-xs text-gray-600 bg-gray-50 flex items-center whitespace-nowrap">
                <i className="bi bi-calendar2 mr-1"></i> {data.Date}
              </span>
            </div>
          </motion.div>
        );
      })}
{editT && <EditTask />}
  </div>
</div>
</div>
  );
}
