import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch , faBook} from "@fortawesome/free-solid-svg-icons";

export default function NavigationBar() {
  return (
  <div className="NavBar h-[100px] w-full flex items-center justify-between px-[100px] text-white shadow-md">
      <div className="Nav-links h-full w-[500px] flex justify-evenly items-center">
        <Link to="/Home" className="Home">
          Home
        </Link>
        <Link to="/AboutUs" className="AboutUs">
          About
        </Link>
        <Link to="/ContactUs" className="ContactUs">
          Contact
        </Link>
        <Link to="/Blog" className="Blog">
          Blog
        </Link>
        <Link to="/Research" className="Research">
          Research
        </Link>
      </div>
      <div className="Icons flex items-center w-[500px]">
      <div className="flex flex-row items-center gap-6 flex-1 justify-end">
  {/* Search Bar */}
  <div className="flex items-center border border-white/30 rounded-lg px-4 py-2 bg-white/10 backdrop-blur-sm min-w-0 w-64">
    <FontAwesomeIcon icon={faSearch} className="text-white/70 mr-2" />
    <input
      type="text"
      placeholder="Search..."
      className="bg-transparent text-white placeholder-white/70 focus:outline-none w-full"
    />
  </div>
  {/* Book Icon */}
  <span className="material-icons text-white text-3xl"><FontAwesomeIcon icon={faBook}/></span>
  {/* Dropdown */}
  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
    <ul
      tabIndex={0}
  className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
      <li>
        <a className="justify-between">
          Profile
          <span className="badge">New</span>
        </a>
      </li>
      <li><a>Settings</a></li>
      <li><a>Logout</a></li>
    </ul>
  </div>
</div>
      </div>
  
    </div>
  );
}