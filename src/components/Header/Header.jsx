import React from "react"
import "./Header.scss"
import { NavLink } from "react-router-dom"
import logo from "../../assets/images/logo_argentbank.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";/**
 
/** Renders the main navigation header of the application.
 *
 * @category Components
 * @component
 * @returns {React.Component} A React component displaying the header with navigation links.
 */
const Header = () => {
  return (
    <header>
      {/* Logo of the application */}
      <img src={logo} alt="Logo SportSee"></img>

      {/* Navigation menu */}
      <nav className="navbar">
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar__link--active" : "navbar__link"
          }
          to="/signin" // Links to Home page
        >
          <FontAwesomeIcon icon={faCircleUser} className="navbar__icon"/>
          Sign In
        </NavLink>

      </nav>
    </header>
  )
}

export default Header
