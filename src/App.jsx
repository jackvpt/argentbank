import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUserProfile } from "./features/userSlice"
import { loginSuccess } from "./features/authSlice"
import Router from "./components/Router/Router"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    if (token) {
      dispatch(loginSuccess())
      dispatch(fetchUserProfile(token))
    }
  }, [dispatch])

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router />
    </>
  )
}
