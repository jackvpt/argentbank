import "./Profile.scss"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchUserProfile, updateUserName } from "../../api/user"
import Account from "../../components/Account/Account"
import { fetchAccountsByUserId } from "../../api/accounts"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../store/authSlice"
import { useEffect, useState } from "react"

const Profile = () => {
  const [editMode, setEditMode] = useState(false)
  const [newUserFirstName, setNewUserFirstName] = useState("")
  const [newUserLastName, setNewUserLastName] = useState("")
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.auth)

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  })

  const { data: accounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["accounts", user?.id],
    queryFn: () => fetchAccountsByUserId(user.id),
    enabled: !!user,
  })

  useEffect(() => {
    if (user) {
      dispatch(setUser(user))
    }
  }, [user, dispatch])

  const mutation = useMutation({
    mutationFn: updateUserName,
    onSuccess: (updatedUser) => {
      console.log("updatedUser :>> ", updatedUser)
      dispatch(setUser(updatedUser.body))
    },
    onError: (error) => {
      console.error("Error updating user name: ", error)
    },
  })

  const handleCancelEdit = () => {
    setNewUserFirstName("")
    setNewUserLastName("")
    setEditMode(false)
  }

  if (isLoading || isLoadingAccounts) return <p>Loading profile...</p>
  if (isError) return <p>Unable to fetch user profile</p>

  const handleSaveNewUser = () => {
    const updatedUser = {
      firstName: newUserFirstName || user.firstName,
      lastName: newUserLastName || user.lastName,
    }
    mutation.mutate(updatedUser)
    setNewUserFirstName("")
    setNewUserLastName("")
    setEditMode(false)
  }

  return (
    <main className="container__profile">
      <section className="container__profile__header">
        <h1>Welcome back</h1>

        {!editMode ? (
          <>
            <p className="user-name">
              {profile.firstName} {profile.lastName}
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
                placeholder={profile.firstName}
              ></input>
              <input
                type="text"
                value={newUserLastName}
                onChange={(e) => setNewUserLastName(e.target.value)}
                placeholder={profile.lastName}
              ></input>
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






