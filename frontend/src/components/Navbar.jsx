import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import NotificationBell from "./NotificationBell";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("isLoggedIn");

    navigate("/");

  };

  return (

    <nav className="navbar">

      <h2>InvoiceFlow</h2>
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >

        {menuOpen ? <FaTimes /> : <FaBars />}

      </div>

      <div className={menuOpen ? "nav-links active" : "nav-links"}>

        <NavLink
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            style={({isActive})=>({
            color:isActive?"#FFD700":"white"
            })}
            >
            Dashboard
        </NavLink>

        <NavLink
            to="/create"
            onClick={() => setMenuOpen(false)}
            style={({isActive})=>({
            color:isActive?"#FFD700":"white"
            })}
            >
            Create Invoice
        </NavLink>

        <NavLink
            to="/history"
            onClick={() => setMenuOpen(false)}
            style={({isActive})=>({
            color:isActive?"#FFD700":"white"
            })}
            >
            History
        </NavLink>

        <NotificationBell />

        <button
        onClick={() => {
          setMenuOpen(false);
          logout();
        }}
      >
        Logout
      </button>

      </div>

    </nav>

  );

}

export default Navbar;