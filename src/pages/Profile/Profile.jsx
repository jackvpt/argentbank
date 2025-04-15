import "./Profile.scss"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUserProfile, updateUserName } from "../../api/user"
import Account from "../../components/Account/Account"
import { fetchAccountsByUserId } from "../../api/accounts"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader/Loader"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { updateUserInfo } from "../../features/userSlice"

/**
 * Profile component displays user information and a list of accounts.
 * It allows editing the user's first and last name.
 *
 * @component
 * @returns {JSX.Element}
 */
const Profile = () => {
  const dispatch = useDispatch()
  // Local state to handle edit mode and input values
  const [editMode, setEditMode] = useState(false)
  const [newUserFirstName, setNewUserFirstName] = useState("")
  const [newUserLastName, setNewUserLastName] = useState("")

  const queryClient = useQueryClient()

  // Fetch user profile data
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  })

  // Fetch user accounts once the user data is available
  const { data: accounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["accounts", user?.id],
    queryFn: () => fetchAccountsByUserId(user.id),
    enabled: !!user, // Only run this query if user is available
  })

  // Mutation to update the user's name
  const mutation = useMutation({
    mutationFn: updateUserName,
    onSuccess: () => {
      // Refresh user profile after a successful update
      queryClient.invalidateQueries(["userProfile"])
      toast.success("User name updated successfully!")
    },
    onError: (error) => {
      console.error("Error updating user name: ", error)
      toast.error("Erreur lors de la mise à jour du nom")
    },
  })

  /**
   * Cancel editing and reset input fields.
   */
  const handleCancelEdit = () => {
    setEditMode(false)
  }

  /**
   * Save new user name and exit edit mode.
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
      dispatch(
        updateUserInfo({
          firstName: newUserFirstName,
          lastName: newUserLastName,
        })
      )
      setNewUserFirstName("")
      setNewUserLastName("")
    }
    setEditMode(false)
  }

  useEffect(() => {
    if (user) {
      setNewUserFirstName(user.firstName)
      setNewUserLastName(user.lastName)
    }
  }, [user])

  if (isLoading || isLoadingAccounts) return <Loader />
  if (isError) return <ErrorMessage message="Server error" />

  return (
    <main className="container__profile">
      <section className="container__profile__header">
        <h1>Welcome back</h1>

        {!editMode ? (
          <>
            <p className="user-name">
              {user.firstName} {user.lastName}!
            </p>
            <button className="edit-button" onClick={() => setEditMode(true)}>
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
              />
              <input
                type="text"
                value={newUserLastName}
                onChange={(e) => setNewUserLastName(e.target.value)}
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
