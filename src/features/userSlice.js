// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Thunk pour récupérer les infos utilisateur après le login
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token, { rejectWithValue }) => {
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
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message)
      }
      return rejectWithValue("Unexpected error")
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null
      state.firstName = ""
      state.lastName = ""
      state.email = ""
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    },
    updateUserInfo: (state, action) => {
      const { firstName, lastName } = action.payload
      if (firstName !== undefined) {
        state.firstName = firstName
      }
      if (lastName !== undefined) {
        state.lastName = lastName
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const { id, firstName, lastName, email } = action.payload
        state.id = id
        state.firstName = firstName
        state.lastName = lastName
        state.email = email
        state.isAuthenticated = true
        state.loading = false
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, updateUserInfo } = userSlice.actions
export default userSlice.reducer
