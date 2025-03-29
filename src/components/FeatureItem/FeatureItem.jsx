import "./FeatureItem.scss"
import propTypes from "prop-types"

const FeatureItem = ({ title, image, alt, text }) => {
  return (
    <article className="feature-item">
      <div>
        <img
          src={`/assets/images/${image}`}
          alt={alt}
          className="feature-item__icon"
        />
        <h3 className="feature-item__title">{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  )
}

FeatureItem.propTypes = {
  title: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
}

export default FeatureItem
