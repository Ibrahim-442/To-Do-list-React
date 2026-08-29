import React, { createContext, useState, useEffect,type ReactNode } from "react";

type Task = {
  name: string;
  id: number;
  describe: string;
  priority: string;
  State: string;
  Date: string;
 previousState?: string;
};
type ContextType = {
  Tasks: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task>>;
  SaveT: Task[];
  setSaveT: React.Dispatch<React.SetStateAction<Task[]>>;
  Open: boolean;
  SetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editopen:boolean;
  setopenedit:React.Dispatch<React.SetStateAction<boolean>>;
  editT:Task|null;
  seteditT:React.Dispatch<React.SetStateAction<Task|null>>;
};

export const UserContext = createContext<ContextType | null>(null);
export default function Context({ children }: { children: ReactNode }) {
  const [Tasks, setTasks] = useState<Task>({
    id: 0,
    name: "",
    describe: "",
    priority: "",
    State: "Pending",
    Date: "",
    
  });
 const [SaveT, setSaveT] = useState<Task[]>(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(SaveT));
}, [SaveT]);
  const [Open, SetOpen] = useState<boolean>(false);
  const [editopen,setopenedit]=useState <boolean>(false);
    const [editT, seteditT] = useState<Task|null >(null);
    
  


  return (
    <UserContext.Provider
      value={{ Tasks, setTasks, SaveT, setSaveT, SetOpen, Open,editopen,setopenedit,editT, seteditT }}
    >
      {children}
    </UserContext.Provider>
  );
}
