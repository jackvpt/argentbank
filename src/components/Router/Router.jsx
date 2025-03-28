import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "../Header/Header"
import Home from "../../pages/Home/Home"

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
      <main className="container">
        <section className="section__main">
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Home />} />


            {/* Catch-all route for 404 errors */}
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  )
}
