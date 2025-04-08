import "./Home.scss"
import Hero from "../../components/Hero/Hero"
import featuresData from "../../data/featuresData.json"
import FeatureItem from "../../components/FeatureItem/FeatureItem"

/**
 * Home component is the main landing page of the application.
 * It renders a hero banner and a list of feature items loaded from JSON data.
 *
 * @component
 * @returns {JSX.Element}
 */
const Home = () => {
  return (
    <main>
      {/* Hero section displayed at the top of the homepage */}
      <Hero />

      {/* Features section with accessible hidden heading for screen readers */}
      <section className="container__features">
        <h2 className="sr-only">Features</h2>

        {/* Loop through features data and render each feature */}
        {featuresData.map((feature, index) => (
          <FeatureItem
            key={index}
            title={feature.title}
            image={feature.image}
            alt={feature.alt}
            text={feature.text}
          />
        ))}
      </section>
    </main>
  )
}

export default Home
