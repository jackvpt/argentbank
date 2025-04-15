import axios from "axios"

/**
 * Updates the user's first and last name using an authenticated PUT request.
 *
 * @async
 * @function updateUserName
 * @param {Object} params - The user's name information.
 * @param {string} params.firstName - The user's new first name.
 * @param {string} params.lastName - The user's new last name.
 * @returns {Promise<Object>} The response data from the server.
 * @throws {Error} If no token is found or if the request fails.
 */
export const updateUserName = async ({ firstName, lastName }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")
  if (!token) throw new Error("No token found")

  try {
    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      { firstName, lastName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    // Handle the error based on its type
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message)
    } else {
      console.error("Unexpected error:", error)
    }
    throw error
  }
}
