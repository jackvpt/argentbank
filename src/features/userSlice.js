import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

/**
 * Initial state for the user slice.
 * 
 * @typedef {Object} UserState
 * @property {string|null} id - The user's ID.
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 * @property {string} email - The user's email address.
 * @property {boolean} isAuthenticated - Whether the user is authenticated.
 * @property {boolean} loading - Whether a request is currently in progress.
 * @property {string|null} error - Error message, if any.
 */

/** @type {UserState} */
const initialState = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  loading: false,
  error: null,
}

/**
 * Async thunk to fetch the user's profile data from the backend API.
 *
 * @param {string} token - The authentication token to include in the request.
 * @returns {Promise<Object>} The user's profile data from the API response.
 */
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

/**
 * Redux slice for user authentication and profile information.
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Logs out the user and resets user-related state.
     *
     * @param {UserState} state - The current state of the user slice.
     */
    logout: (state) => {
      state.id = null
      state.firstName = ""
      state.lastName = ""
      state.email = ""
      state.loading = false
      state.error = null
    },

    /**
     * Updates the user's first and/or last name.
     *
     * @param {UserState} state - The current state of the user slice.
     * @param {{ payload: { firstName?: string, lastName?: string } }} action - The action containing updated user info.
     */
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
