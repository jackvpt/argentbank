import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUserProfile } from "./features/userSlice"
import { loginSuccess } from "./features/authSlice"
import Router from "./components/Router/Router"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

/**
 * Root component of the application.
 *
 * This component:
 * - Initializes the authentication state on application load.
 * - Dispatches a login success action if a token is found in localStorage or sessionStorage.
 * - Fetches the user profile using the stored token.
 * - Renders the application router and a toast notification container.
 *
 * @component
 * @returns {JSX.Element} The root App component.
 */
export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    /**
     * Check for a stored token in localStorage or sessionStorage.
     * If a token is found, the user is considered authenticated and the profile is fetched.
     */
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token")
    if (token) {
      // Set authentication state to true in Redux store
      dispatch(loginSuccess())

      // Fetch user profile based on token
      dispatch(fetchUserProfile(token))
    }
  }, [dispatch])

  return (
    <>
      {/* Toast notifications container (auto-closing after 3 seconds) */}
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Main router handling all application routes */}
      <Router />
    </>
  )
}
