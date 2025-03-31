import axios from "axios"

export const login = async (email, password) => {
  const response = await axios.post("http://localhost:3001/api/v1/user/login", {
    email,
    password,
  })
  return response.data
}
