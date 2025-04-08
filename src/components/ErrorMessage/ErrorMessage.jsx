import "./ErrorMessage.scss"
import errorIcon from "../../assets/images/icon_error.png"
import { Link } from "react-router"
import PropTypes from "prop-types"

/**
 * Displays an error message with an icon and a link to return to the homepage.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} The rendered error message section.
 */
const ErrorMessage = ({ message }) => {
  return (
    <section className="container__error">
      <div className="container__error-message">
        <img
          src={errorIcon}
          alt="Error icon"
          className="error-icon"
          width={32}
        />
        <p>{message}</p>
      </div>
      <Link className="error__link" to="/" aria-label="Retour à l'accueil">
        Retourner sur la page d'accueil
      </Link>{" "}
    </section>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorMessage
