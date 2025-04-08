import "./styles/main.scss"
import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

/**
 * Initializes a new QueryClient instance for React Query.
 * This client is used to manage all queries and mutations within the app.
 */
const queryClient = new QueryClient()

/**
 * Renders the root of the React application.
 * - Wraps the app in `React.StrictMode` for highlighting potential issues.
 * - Provides the `QueryClient` to the entire app for React Query.
 * - Includes React Query Devtools for development and debugging.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
