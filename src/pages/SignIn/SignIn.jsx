import "./SignIn.scss"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { login } from "../../api/auth"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../../store/authSlice"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      dispatch(loginSuccess(data))
      navigate("/profile")
    },
    onError: (error) => {
      console.error("Connection error: ", error)
    },
  })

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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Connection..." : "Sign In"}
            {/* <Link to="/profile">Sign In</Link> */}
          </button>
        </form>
        {mutation.isError && <p>Connection error</p>}
      </div>
    </main>
  )
}

export default SignIn
