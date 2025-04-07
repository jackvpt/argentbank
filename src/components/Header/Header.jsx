import "./Header.scss"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/images/logo_argentbank.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUserProfile } from "../../api/user"

/** Renders the main navigation header of the application.
 *
 * @category Components
 * @component
 * @returns {React.Component} A React component displaying the header with navigation links.
 */
const Header = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { data: user, isSuccess } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const handleSignOut = () => {
    localStorage.removeItem("token")
    sessionStorage.removeItem("token")
    queryClient.removeQueries({ queryKey: ["userProfile"] })
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
        {isSuccess ? (
          <>
            <Link className="navbar__user" to="/profile">
              {user.firstName}
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
