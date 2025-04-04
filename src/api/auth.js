import axios from "axios"

/**
 * Authenticates a user with their email and password.
 *
 * @async
 * @function login
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise resolving to the response data containing the authentication token and user details.
 * @throws {Error} Throws an error if authentication fails.
 */
export const login = async (email, password) => {
  const response = await axios.post("http://localhost:3001/api/v1/user/login", {
    email,
    password,
  })
  return response.data
}

/**
 * Retrieves the user's profile using the stored authentication token.
 *
 * @async
 * @function fetchUserProfile
 * @returns {Promise<Object>} A promise resolving to the user's profile data.
 * @throws {Error} Throws an error if no token is found or if the request fails.
 */
export const fetchUserProfile = async () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")
  if (!token) throw new Error("No token found")

  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data.body
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
