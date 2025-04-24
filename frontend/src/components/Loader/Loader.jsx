import "./Loader.scss"
import logo from "../../assets/images/logo_argentbank.png"

/**
 * Loader component displaying a loading animation.
 *
 * @component
 * @returns {JSX.Element} The Loader component.
 */
const Loader = () => {
  return (
    <div className="loader__modal">
      <div className="chase-container">
        <img src={logo} alt="argentbank logo" className="chase-image" />
        <div className="chase-object large"></div>
        <div className="chase-object small"></div>
        <div className="chase-object smaller"></div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  )
}

export default Loader
