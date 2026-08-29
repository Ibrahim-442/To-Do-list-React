import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./component/Nav/Nav.tsx";
import Tasks from "./component/Tasks/Tasks.tsx"
import Dash from "./component/Dash/Dash.tsx"

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/Dash" element={<Dash />} />
      </Routes>
    </BrowserRouter>
  );
}
