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


