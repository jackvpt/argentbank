import "./SignIn.scss";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

/**
 * SignIn component allows users to log in by providing their credentials.
 *
 * @component
 * @returns {JSX.Element} The sign-in form with input fields for email and password.
 */
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles the login request using React Query's `useMutation`.
   * - On success: Stores the token in local/session storage, updates Redux state, and navigates to the profile page.
   * - On error: Logs an error message.
   */
  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      dispatch(loginSuccess(data));

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      if (rememberMe) {
        localStorage.setItem("token", data.body.token);
      } else {
        sessionStorage.setItem("token", data.body.token);
      }

      navigate("/profile");
    },
    onError: (error) => {
      console.error("Connection error: ", error);
    },
  });

  /**
   * Handles form submission, preventing default behavior and triggering the login mutation.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

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
            <input 
              type="checkbox" 
              id="remember-me" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Connecting..." : "Sign In"}
          </button>
        </form>
        {mutation.isError && <p>Connection error</p>}
      </div>
    </main>
  );
};

export default SignIn;








