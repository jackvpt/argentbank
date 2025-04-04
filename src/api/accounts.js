import AccountsModel from "../models/AccountsModel"

export const fetchAccountsByUserId = async (userId) => {
  try {
    const response = await fetch("/__mocks__/accounts.json")
    if (!response.ok) throw new Error("Mock data request failed")
    const data = await response.json()
    const accounts = data.find((user) => user.userId === userId)

    const userAccounts = accounts.account

    if (!userAccounts) throw new Error(`User ${userId} not found in mock data.`)

    return  userAccounts 
  } catch (error) {
    console.error(
      `Error fetching accounts data from mock data: ${error.message}`
    )
    throw error
  }
}
