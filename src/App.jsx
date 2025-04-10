import Router from "./components/Router/Router"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router />
    </>
  )
}
