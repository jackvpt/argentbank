import "./Hero.scss"

/**
 * Hero component - displays a promotional banner on the homepage.
 *
 * @category Components
 * @component
 * @returns {JSX.Element} The Hero section with promotional content.
 *
 * @example
 * <Hero />
 */
const Hero = () => {
  return (
    <section className="container__hero">
      <div className="hero__content">
        {/* Visually hidden title for screen readers (accessibility best practice) */}
        <h2 className="sr-only">Promoted Content</h2>

        {/* Promotional subtitle with line breaks */}
        <p className="hero__content__subtitle">
          No fees.
          <br />
          No minimum deposit.
          <br />
          High interest rates.
        </p>

        <br />

        {/* Promotional call-to-action */}
        <p className="hero__content__text">
          Open a savings account with Argent Bank today!
        </p>
      </div>
    </section>
  )
}

export default Hero
