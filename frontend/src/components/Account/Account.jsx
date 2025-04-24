import "./Account.scss"

/**
 * Account component - displays information about a user's bank account.
 *
 * @category Components
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.account - The account information.
 * @param {string} props.account.title - The account title (e.g., "Checking Account").
 * @param {number} props.account.amount - The current account balance.
 * @param {string} props.account.description - A short description of the account type.
 * @returns {JSX.Element} A section with the account's title, amount, description, and a CTA button.
 *
 * @example
 * <Account
 *   account={{
 *     title: "Checking Account",
 *     amount: 2280.33,
 *     description: "Available balance"
 *   }}
 * />
 */
const Account = ({ account }) => {
  /**
   * Formats a number with a thousands separator and two decimal places.
   *
   * @param {number} num - The number to format.
   * @returns {string} The formatted number string (e.g., "2,280.33").
   */
  const formatNumber = (num) => {
    return num
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <section className="container__account">
      <div className="account-content-wrapper">
        {/* Account title */}
        <h3 className="account-title">{account.title}</h3>

        {/* Formatted account amount */}
        <p className="account-amount">${formatNumber(account.amount)}</p>

        {/* Description (e.g., "Available balance") */}
        <p className="account-amount-description">{account.description}</p>
      </div>

      {/* Call to action */}
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}

export default Account
