/**
 * @file Profile.jsx
 * @description The Profile component displays the user's profile information and their list of accounts.
 * It allows the user to edit their first and last name.
 */

import "./Profile.scss"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateUserName } from "../../api/user"
import Account from "../../components/Account/Account"
import { fetchAccountsByUserId } from "../../api/accounts"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader/Loader"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { updateUserInfo } from "../../features/userSlice"
import { useNavigate } from "react-router"

/**
 * Profile component displays the user's information and a list of accounts.
 * It allows the user to edit their first and last name.
 *
 * @component
 * @returns {JSX.Element}
 */
const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()

  /**
   * Redirects to login page if the user is not authenticated.
   */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  // Local state to handle edit mode and input values
  const [editMode, setEditMode] = useState(false)

  /**
   * Stores the updated first name input value.
   * @type {Array.<string, Function>}
   */
  const [newUserFirstName, setNewUserFirstName] = useState("")

  /**
   * Stores the updated last name input value.
   * @type {Array.<string, Function>}
   */
  const [newUserLastName, setNewUserLastName] = useState("")

  const queryClient = useQueryClient()

  /**
   * Query to fetch the user's account data using their ID.
   * Enabled only when user ID is available.
   */
  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    error,
  } = useQuery({
    queryKey: ["accounts", user?.id],
    queryFn: () => fetchAccountsByUserId(user?.id),
    enabled: !!user.id,
  })

  /**
   * Mutation to update the user's name.
   * On success, invalidates the user profile query and shows a toast notification.
   */
  const mutation = useMutation({
    mutationFn: updateUserName,
    onSuccess: (data, variables) => {
      dispatch(updateUserInfo(variables))
      queryClient.invalidateQueries(["userProfile"])
      toast.success("User name updated successfully!")
    },
    onError: (error) => {
      console.error("Error updating user name: ", error)
      toast.error("Error updating the name")
    },
  })

  /**
   * Enables edit mode and populates the input fields with the current name values.
   */
  const handleEdit = () => {
    setNewUserFirstName(user.firstName)
    setNewUserLastName(user.lastName)
    setEditMode(true)
  }

  /**
   * Cancels the editing process and resets input fields.
   * Exits the edit mode without saving any changes.
   */
  const handleCancelEdit = () => {
    setEditMode(false)
  }

  /**
   * Saves the new user name and exits edit mode.
   * If the name values have changed, triggers the mutation to update the name and updates the Redux state.
   */
  const handleSaveNewUser = () => {
    const updatedUser = {
      firstName: newUserFirstName || user.firstName,
      lastName: newUserLastName || user.lastName,
    }

    if (
      newUserFirstName !== user.firstName ||
      newUserLastName !== user.lastName
    ) {
      mutation.mutate(updatedUser)
      setNewUserFirstName("")
      setNewUserLastName("")
    }
    setEditMode(false)
  }

  if (isLoadingAccounts || !user.id) return <Loader />
  if (error) return <ErrorMessage message="Server error" />

  return (
    <main className="container__profile">
      <section className="container__profile__header">
        <h1>Welcome back</h1>
        {!editMode ? (
          <>
            <p className="user-name">
              {user.firstName} {user.lastName}!
            </p>
            <button className="edit-button" onClick={handleEdit}>
              Edit Name
            </button>
          </>
        ) : (
          <div className="edit-form">
            <div className="edit-form__inputs">
              <input
                type="text"
                value={newUserFirstName}
                onChange={(e) => setNewUserFirstName(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
              <input
                type="text"
                value={newUserLastName}
                onChange={(e) => setNewUserLastName(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="edit-form__controls">
              <div
                className="edit-form__controls__button"
                onClick={handleSaveNewUser}
              >
                Save
              </div>
              <div
                className="edit-form__controls__button"
                onClick={handleCancelEdit}
              >
                Cancel
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="accounts">
        {accounts.map((account, index) => (
          <Account key={index} account={account} />
        ))}
      </section>
    </main>
  )
}

export default Profile
