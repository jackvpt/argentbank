import React from "react"
import "./Header.scss"
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "../../assets/images/logo_argentbank.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/authSlice"
/** Renders the main navigation header of the application.
 *
 * @category Components
 * @component
 * @returns {React.Component} A React component displaying the header with navigation links.
 */
const Header = () => {
  const dispatch = useDispatch()
  const userFirstName = useSelector((state) => state.auth.firstName)
  const navigate = useNavigate()

  const handleSignOut = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <header>
      {/* Logo of the application */}
      <Link to="/">
        <img src={logo} alt="Logo SportSee"></img>
      </Link>

      {/* Navigation menu */}
      <nav className="navbar">
        <FontAwesomeIcon icon={faCircleUser} className="navbar__icon" />
        {userFirstName ? (
          <>
            <Link className="navbar__user" to="/profile">
              {userFirstName}
            </Link>
            <p className="navbar__link" onClick={handleSignOut}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="navbar__icon"
              />
              Sign Out
            </p>
          </>
        ) : (
          <Link
            className="navbar__link"
            to="/login" // Links to Home page
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
