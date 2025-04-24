import "./SignIn.scss"
import { useState } from "react"
import { login } from "../../features/authSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "../../features/userSlice"

/**
 * SignIn component allows users to log in by providing their credentials.
 *
 * @component
 * @returns {JSX.Element} The sign-in form with input fields for email and password.
 */
const SignIn = () => {
  const dispatch = useDispatch()
  const { loading: authLoading, error: authError } = useSelector(
    (state) => state.auth
  )
  const [email, setEmail] = useState("")
  const [userNameIsValid, setUserNameIsValid] = useState(true)
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  /**
   * Checks if a username is valid based on its length.
   * @param {string} userName
   */
  const checkUserName = (userName) => {
    setUserNameIsValid(userName.length >= 3)
  }

  /**
   * Checks if a password is valid based on the following criteria:
   * - At least 8 characters long
   * - Contains at least one letter (uppercase or lowercase)
   * - Contains at least one number
   *
   * Updates the `passwordIsValid` state with `true` if the password is valid, otherwise `false`.
   *
   * @param {string} password - The password to validate.
   */
  const checkPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    setPasswordIsValid(regex.test(password))
  }

  /**
   * Handles form submission, preventing default behavior and triggering the login mutation.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resultAction = await dispatch(
        login({ email, password, rememberMe })
      ).unwrap()
      const token = resultAction.token
      dispatch(fetchUserProfile(token))
    } catch (err) {
      console.error("Login failed:", err)
    }

    navigate("/profile")
  }

  return (
    <main className="container__signin">
      <div className="container__signin__content">
        <FontAwesomeIcon icon={faCircleUser} className="navbar__icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">
              Username<span className="input-wrapper__required">*</span>
            </label>
            <input
              type="text"
              id="username"
              minLength="3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => checkUserName(e.target.value)}
              required
            />
            <div className="input-error">
              {!userNameIsValid && "Username must be at least 3 characters"}
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">
              Password<span className="input-wrapper__required">*</span>
            </label>
            <input
              type="password"
              id="password"
              minLength="2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => checkPassword(e.target.value)}
              required
            />
            <div className="input-error">
              {!passwordIsValid && "Password does not meet criteria"}
            </div>
          </div>
          <div className="input-wrapper__required-text">
            <span className="input-wrapper__required">*</span>Required fields
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="sign-in-button"
            type="submit"
            disabled={authLoading || !userNameIsValid || !passwordIsValid}
          >
            {authLoading ? "Connecting..." : "Sign In"}
          </button>
        </form>
        {authError && <div className="signin-error">Invalid credentials</div>}
      </div>
    </main>
  )
}

export default SignIn
