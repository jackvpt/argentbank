/**
 * @file store.js
 * @description Configure le store Redux avec les slices `auth` et `user`.
 */

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/authSlice"
import userReducer from "./features/userSlice"

/**
 * Le store Redux configuré avec les reducers de l'application.
 *
 * @const
 * @type {object}
 * @property {Function} auth - Reducer pour l'authentification.
 * @property {Function} user - Reducer pour les informations utilisateur.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
})
