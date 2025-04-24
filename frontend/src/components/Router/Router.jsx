import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "../Header/Header"
import Home from "../../pages/Home/Home"
import Footer from "../Footer/Footer"
import SignIn from "../../pages/SignIn/SignIn"
import Profile from "../../pages/Profile/Profile"

/**
 * Manages the routing of the application using React Router.
 *
 * This component defines the structure of the app, including:
 * - A fixed header (`Header`)
 * - A sidebar (`Sidebar`)
 * - Dynamic routes for pages (`Home`, `Profile`, and `Error`)
 *
 * @category Router
 * @component
 * @returns {JSX.Element} The Router component handling application navigation.
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />

        {/* Catch-all route for 404 errors */}
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
