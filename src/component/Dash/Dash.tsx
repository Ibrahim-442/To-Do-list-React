import "./Dash.css";
import { useContext } from "react";
import { UserContext } from "../../context.tsx";
import Last from "./Last.tsx"

export default function Dash() {
  const { SaveT } = useContext(UserContext)!;
  const allT = SaveT.length;
  const Pcount = SaveT.filter((item) => item.State === "Pending").length;
  const InProgressCount = SaveT.filter(
    (item) => item.State === "In Progress",
  ).length;
  const CompleteCOunt = SaveT.filter(
    (item) => item.State === "Completed",
  ).length;

  return (

<div className="mt-5 w-full px-4">
  <div className="rounded-2xl shadow-2xl bg-white d-flex justify-center align-middle py-4 w-full items-center">
    <div className="d-flex align-middle gap-4 flex-wrap justify-center w-full">

      <div className="Dashde p-3 rounded-2xl shadow-2xl bg-purple-50">
        <div className="flex gap-3">
          <div className="icon-box bg-purple-700 rounded-4">
            <i className="bi bi-list-check fs-2 text-white"></i>
          </div>
          <h3 className="pt-1">Total Tasks</h3>
        </div>

        <h4 className="d-flex align-middle justify-center">
          {allT}
        </h4>
      </div>

      <div className="Dashde p-3 rounded-2xl shadow-2xl bg-orange-50">
        <div className="flex gap-3">
          <div className="icon-box bg-orange-300 rounded-4">
            <i className="bi bi-clock fs-2 text-white"></i>
          </div>
          <h3 className="pt-1">Pending</h3>
        </div>

        <h4 className="d-flex align-middle justify-center">
          {Pcount}
        </h4>
      </div>

      <div className="Dashde p-3 rounded-2xl shadow-2xl bg-blue-50">
        <div className="flex gap-3">
          <div className="icon-box rounded-4 bg-blue-400">
            <i className="bi bi-arrow-repeat fs-2 text-white"></i>
          </div>
          <h3 className="pt-1">In Progress</h3>
        </div>

        <h4 className="d-flex align-middle justify-center">
          {InProgressCount}
        </h4>
      </div>

      <div className="Dashde p-3 rounded-2xl shadow-2xl bg-green-50">
        <div className="flex gap-3">
          <div className="icon-box rounded-4 bg-green-400">
            <i className="bi bi-check-circle fs-2 text-white"></i>
          </div>
          <h3 className="pt-1">Completed</h3>
        </div>

        <h4 className="d-flex align-middle justify-center">
          {CompleteCOunt}
        </h4>
      </div>

    </div>
  </div>

 


        <div className="mb-4"><Last /></div>
    </div>
  );
}
