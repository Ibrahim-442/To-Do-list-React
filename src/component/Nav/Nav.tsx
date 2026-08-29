
import { NavLink } from "react-router-dom";
import "./Nav.css";


export default function Nav() {

  return (
    <nav className="navbar d-flex justify-content-center bg-slate-800">
    
      <ul className="nav gap-5  font-bold font-mono">
  
        <li className="nav-item">
          <NavLink to="/" className="nav-link alllinks" style={({isActive})=>({
            color: isActive?"rgb(76, 169, 219)":"gray"
           })} >
           <i className="bi bi-file-earmark-text fs-4"></i> Tasks
         </NavLink>
        </li>
        <li className="nav-item">
         <NavLink to="/Dash" className="nav-link alllinks" style={({isActive})=>({
            color: isActive?"rgb(76, 169, 219)":"gray"
           })}>
          <i className="bi bi-grid-fill fs-4"></i>  Dashboard
          </NavLink>
        </li>
      </ul>
    <div></div>
    </nav>
  );
}
