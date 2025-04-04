import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // user: null,
    token: localStorage.getItem("token") || sessionStorage.getItem("token") || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      // state.user = action.payload.user
      state.token = action.payload.body.token
      // localStorage.setItem("token", action.payload.token)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem("token")
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer

