import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { resetUserInfos } from "./userSlice"

/**
 * Async thunk for user login.
 *
 * Sends a POST request with user credentials.
 * Stores the token in localStorage or sessionStorage based on `rememberMe`.
 *
 * @function
 * @param {Object} credentials - Login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @param {boolean} credentials.rememberMe - Flag for persistent login.
 * @param {Object} thunkAPI - The thunk API object from Redux Toolkit.
 * @returns {Promise<Object>} Resolves with token and rememberMe if successful, or rejects with an error message.
 */
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

      clearStorage()

      // Store token based on rememberMe flag
      rememberMe
        ? localStorage.setItem("token", token)
        : sessionStorage.setItem("token", token)

      return { token, rememberMe }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed")
    }
  }
)

/**
 * Thunk action for logging out the user.
 *
 * Clears the token from both localStorage and sessionStorage,
 * resets user-specific information in the Redux store, and dispatches
 * the logout action to reset the auth state.
 *
 * @function
 * @returns {Function} A thunk function to be dispatched.
 * @param {Function} dispatch - Redux dispatch function provided by thunk middleware.
 */
export const logout = () => async (dispatch) => {
  clearStorage()
  dispatch(resetUserInfos())
  dispatch({
    type: "auth/logout",
  })
}

/**
 * Clears the token from both localStorage and sessionStorage.
 */
const clearStorage = () => {
  localStorage.removeItem("token")
  sessionStorage.removeItem("token")
}

/**
 * Initial token retrieved from storage if it exists.
 * This ensures the auth state persists on page refresh.
 */
const initialToken =
  localStorage.getItem("token") || sessionStorage.getItem("token")

/**
 * Initial state for authentication.
 * @type {Object}
 * @property {string|null} token - JWT token if user is authenticated.
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @property {boolean} loading - Tracks the loading state of async actions.
 * @property {string|null} error - Stores any login error message.
 */
const initialState = {
  token: initialToken,
  isAuthenticated: !!initialToken,
  loading: false,
  error: null,
}

/**
 * Redux slice for authentication.
 * Handles login, logout, and state updates related to user authentication.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets the authentication status to true.
     * Useful when restoring auth from token (e.g., in useEffect).
     * @param {Object} state - The current auth state.
     */
    loginSuccess: (state) => {
      state.isAuthenticated = true
    },

    /**
     * Logs out the user by clearing token and resetting state.
     * Removes tokens from both localStorage and sessionStorage.
     * @param {Object} state - The current auth state.
     */
    logout: (state) => {
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
      clearStorage()

      resetUserInfos()
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * Sets loading to true while login is pending.
       */
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      /**
       * Stores token and updates auth state on successful login.
       */
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      /**
       * Sets error message on failed login.
       */
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
  },
})

export const { loginSuccess } = authSlice.actions
export default authSlice.reducer
