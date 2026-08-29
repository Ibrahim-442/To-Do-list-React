import { UserContext } from "../../../context.tsx";
import { useContext } from "react";

export default function EditTask() {
  const { setSaveT, editopen, editT, seteditT } = useContext(UserContext)!;

  const saveedit = () => {
    if (!editT) return;
    setSaveT((prev) =>
      prev.map((item) => (item.id === editT.id ? editT : item)),
    );
    seteditT(null);
  };

  return (
  
<div className={`overlay ${editopen ? "show" : ""}`} tabIndex={-1}>
 <form
  onSubmit={(e) => {
    e.preventDefault();
    saveedit();
  }}
    className="flex justify-center items-center w-full h-full bg-transparent"

>
 <div 
  className="
    bg-white
    p-4 sm:p-5
    rounded-4xl
    shadow-cyan-900 shadow-xl/30
    w-[92%]
    sm:w-[90%]
    md:w-[80%]
    lg:w-[70%]
    xl:w-[60%]
    max-w-[900px]
    max-h-[90vh]
    overflow-y-auto
  "
>
      <div className="flex justify-center items-center text-black">
        <h2 className="CreateTask">Edit Task</h2>
      </div>

      <div className="mb-3 text-black">
        <label htmlFor="taskTitle" className="form-label">
          Task Title
        </label>

        <input
          type="text"
          className="form-control w-full"
          placeholder="e.g. Study , Gym"
          value={editT?.name}
          onChange={(e) =>
            seteditT({ ...editT, name: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="Description"
          className="form-label text-black"
        >
          Description
        </label>

        <textarea
          id="Description"
          name="describe"
          className="form-control w-full min-h-[100px]"
          placeholder="Add more details about your task..."
          value={editT?.describe}
          onChange={(e) =>
            seteditT({ ...editT, describe: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3 flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-8 lg:gap-12">
        <div className="w-[150px] sm:w-[170px] lg:w-[190px] text-black">
          <label htmlFor="priority" className="prioand form-label">
            priority
          </label>

          <select
            className="form-select prioandDate !w-full"
            id="priority"
            name="priority"
            value={editT?.priority}
            onChange={(e) =>
              seteditT({ ...editT, priority: e.target.value })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="w-[150px] sm:w-[170px] lg:w-[190px] text-black">
          <label htmlFor="State" className="prioand form-label">
            State
          </label>

          <select
            className="form-select prioandDate !w-full"
            id="State"
            name="State"
            value={editT?.State}
            onChange={(e) =>
              seteditT({ ...editT, State: e.target.value })
            }
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="w-[150px] sm:w-[170px] lg:w-[190px]">
          <label htmlFor="Date" className="form-label text-black">
            Due Date
          </label>

          <input
            type="date"
            id="Date"
            className="form-control prioandDate !w-full"
            value={editT?.Date}
            onChange={(e) =>
              seteditT({ ...editT, Date: e.target.value })
            }
            required
          />
        </div>
      </div>

        <div className="flex justify-center items-center gap-2.5 max-sm:flex-col max-sm:w-full">
            <button className="savebtn" type="submit" onClick={saveedit}> <span className="text">Edit</span>
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
             className="noselect" type="button" onClick={() => { seteditT(null); }}
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
