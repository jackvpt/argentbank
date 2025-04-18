import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// 🔐 Login async thunk
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          email,
          password,
        }
      )

      const token = response.data.body.token

      // Stockage du token selon le choix de rememberMe
      if (rememberMe) {
        localStorage.setItem("token", token)
      } else {
        sessionStorage.setItem("token", token)
      }

      return { token, rememberMe }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed")
    }
  }
)

// 🔒 Initial state
const initialToken =
  localStorage.getItem("token") || sessionStorage.getItem("token")

const initialState = {
  token: initialToken,
  isAuthenticated: !!initialToken,
  loading: false,
  error: null,
}

// 🔧 Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
  },
})

export const {loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
