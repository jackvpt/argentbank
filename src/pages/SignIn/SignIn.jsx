import "./SignIn.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router"

const SignIn = () => {
  return (
    <main className="container__signin">
      <div className="container__signin__content">
        <FontAwesomeIcon icon={faCircleUser} className="navbar__icon" />
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">
            <Link to="/profile">Sign In</Link>
          </button>
        </form>
      </div>
    </main>
  )
}

export default SignIn
