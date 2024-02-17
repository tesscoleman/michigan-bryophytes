import "./header.css"
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="topnav">
        <p className="topnav-heading" >
          <NavLink to="/">Moss</NavLink> | <NavLink to="/about">About</NavLink>  | <NavLink to="/resources">Resources</NavLink>
        </p>
        {/* <div className="search-container">
          <form id="search-form">
            <input type="search" id="moss-search" name="q" placeholder="Search..." />
          </form>
        </div> */}
      </div>
    </>
  );
}
