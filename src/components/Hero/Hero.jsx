import "./Hero.scss"
import bankTreeImage from "../../assets/images/bank-tree.jpeg"

const Hero = () => {
  return (
    <section className="container__hero">
      <img src={bankTreeImage} alt="Hero" className="hero__img" />
      <div className="hero__content">
        <h2 className="sr-only">Promoted Content</h2>
        <p className="hero__content__subtitle">
          No fees.
          <br />
          No minimum deposit.
          <br />
          High interest rates.
        </p>
        <p className="hero__content__text">
          Open a savings account with Argent Bank today!
        </p>
      </div>
    </section>
  )
}
export default Hero
