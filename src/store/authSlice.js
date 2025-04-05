import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token:null,
  isAuthenticated: false,
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  createdAt: null,
  updatedAt: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.body.token
      state.isAuthenticated = true
    },
    setUser: (state, action) => {
      state.id = action.payload.id
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      state.createdAt = action.payload.createdAt
      state.updatedAt = action.payload.updatedAt
    },
    logout: (state) => {
      state.token = null
      state.isAuthenticated = false
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.createdAt = null;
      state.updatedAt = null;
      // Clear token from localStorage
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
    }
  },
})

export const { loginSuccess, setUser, logout } = authSlice.actions
export default authSlice.reducer

