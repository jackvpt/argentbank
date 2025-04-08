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
      <div class="chase-container">
        <img src={logo} alt="argentbank logo" class="chase-image" />
        <div class="chase-object large"></div>
        <div class="chase-object small"></div>
        <div class="chase-object smaller"></div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  )
}

export default Loader
