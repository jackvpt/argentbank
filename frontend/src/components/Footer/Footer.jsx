import "./Footer.scss"

/**
 * Footer component - displays the footer section of the application.
 *
 * @category Components
 * @component
 * @returns {JSX.Element} The Footer with a copyright.
 *
 * @example
 * <Footer />
 */
const Footer = () => {
  return (
    <footer>
      {/* Simple footer text */}
      <p className="footer-text">Copyright 2020 Argent Bank</p>
    </footer>
  )
}

export default Footer
