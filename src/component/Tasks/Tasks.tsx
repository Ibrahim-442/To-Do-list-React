import { useContext } from "react";
import { UserContext } from "../../context.tsx";
import TrueT from "./main/trueTask.tsx";
import AddTask from "./main/AddTask.tsx";
import "./Tasks.css";

export default function Tasks() {
  const { SaveT, SetOpen, Open } = useContext(UserContext)!;

  return (
    <div className="p-5">
      <div
        className="flex
          justify-between"
      >
        <h2 className="font-serif">Tasks</h2>
        <button className="ADDBTN" onClick={() => SetOpen(true)}>
          <span className="text">Add</span>
          <span className="icon">
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
            <span className="buttonSpan">+</span>
          </span>
        </button>
        {Open && <AddTask />}
      </div>
      {SaveT.length > 0 ? (
        <TrueT />
      ) : (
        <div className="mt-3 w-full px-3 sm:px-4">
          <div className="rounded-2xl shadow-2xl  bg-white d-flex justify-center align-middle noCon w-full min-h-[12vh]  items-center">
            <p className="font-extrabold noConFont">
              You Have No Tasks.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
