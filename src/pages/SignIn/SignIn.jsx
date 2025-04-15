import "./SignIn.scss"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { login } from "../../api/auth"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { fetchUserProfile } from "../../features/userSlice"

/**
 * SignIn component allows users to log in by providing their credentials.
 *
 * @component
 * @returns {JSX.Element} The sign-in form with input fields for email and password.
 */
const SignIn = () => {
  const dispatch=useDispatch()
  const [email, setEmail] = useState("")
  const [userNameIsValid, setUserNameIsValid] = useState(true)
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  /**
   * Handles the login request using React Query's `useMutation`.
   * - On success: Stores the token in local/session storage, updates Redux state, and navigates to the profile page.
   * - On error: Logs an error message.
   */
  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
      if (rememberMe) {
        localStorage.setItem("token", data.body.token)
      } else {
        sessionStorage.setItem("token", data.body.token)
      }
      dispatch(fetchUserProfile(data.body.token))
      navigate("/profile")
    },
    onError: (error) => {
      console.error("Connection error: ", error)
    },
  })

  const checkUserName = (userName) => {
    setUserNameIsValid(userName.length >= 3)
  }

  /**
   * Vérifie si le mot de passe est valide :
   * - au moins 8 caractères
   * - contient au moins une lettre
   * - contient au moins un chiffre
   *
   * @param {string} password - Le mot de passe à valider.
   * @returns {boolean} True si le mot de passe est valide, sinon false.
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
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate()
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
            disabled={
              mutation.isLoading || !userNameIsValid || !passwordIsValid
            }
          >
            {mutation.isLoading ? "Connecting..." : "Sign In"}
          </button>
        </form>
        {mutation.isError && (
          <div className="signin-error">Invalid credentials</div>
        )}
      </div>
    </main>
  )
}

export default SignIn
