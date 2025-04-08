import "./FeatureItem.scss"
import propTypes from "prop-types"

/**
 * FeatureItem component - displays a feature block with an icon, title, and description.
 *
 * @category Components
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.title - The title of the feature.
 * @param {string} props.image - The filename of the icon image (e.g., "chat.png").
 * @param {string} props.alt - The alternative text for the image.
 * @param {string} props.text - The description or explanatory text of the feature.
 * @returns {JSX.Element} A feature block with an image, title, and text.
 *
 * @example
 * <FeatureItem
 *   title="No Fees"
 *   image="chat.png"
 *   alt="Chat icon"
 *   text="Enjoy 24/7 support with no hidden charges."
 * />
 */
const FeatureItem = ({ title, image, alt, text }) => {
  return (
    <article className="feature-item">
      <div>
        {/* Feature icon */}
        <img
          src={`/assets/images/${image}`}
          alt={alt}
          className="feature-item__icon"
        />

        {/* Feature title */}
        <h3 className="feature-item__title">{title}</h3>

        {/* Feature description */}
        <p>{text}</p>
      </div>
    </article>
  )
}

// Props validation
FeatureItem.propTypes = {
  title: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
}

export default FeatureItem
