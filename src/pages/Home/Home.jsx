import "./Home.scss"
import Hero from "../../components/Hero/Hero"
import featuresData from "../../data/featuresData.json"
import FeatureItem from "../../components/FeatureItem/FeatureItem"

const Home = () => {
  return (
    <>
      <Hero />
      <section className="container__features">
        <h2 class="sr-only">Features</h2>
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
    </>
  )
}

export default Home
