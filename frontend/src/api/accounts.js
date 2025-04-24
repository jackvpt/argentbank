/**
 * Fetches account data for a specific user.
 *
 * @async
 * @function fetchAccountsByUserId
 * @param {string} userId - The ID of the user whose accounts are to be retrieved.
 * @returns {Promise<Object[]>} A promise that resolves to an array of account objects for the specified user.
 * @throws {Error} If the fetch fails, the response is not OK, or the user is not found.
 */
export const fetchAccountsByUserId = async (userId) => {
  try {
    const response = await fetch("/__mocks__/accounts.json")
    if (!response.ok) throw new Error("Mock data request failed")
    const data = await response.json()
    const accounts = data.find((user) => user.userId === userId)

    const userAccounts = accounts.account

    if (!userAccounts) throw new Error(`User ${userId} not found in mock data.`)

    return userAccounts
  } catch (error) {
    console.error(
      `Error fetching accounts data from mock data: ${error.message}`
    )
    throw error
  }
}
