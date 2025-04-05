import "./Profile.scss"
import { useQuery } from "@tanstack/react-query"
import { fetchUserProfile } from "../../api/user"
import Account from "../../components/Account/Account"
import { fetchAccountsByUserId } from "../../api/accounts"
import { useDispatch } from "react-redux"
import { setUser } from "../../store/authSlice"

const Profile = () => {
  const dispatch = useDispatch()

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

  if (isLoading || isLoadingAccounts) return <p>Loading profile...</p>
  if (isError) return <p>Unable to fetch user profile</p>

  dispatch(setUser(user))

  return (
    <main className="container__profile">
      <div className="container__profile__header">
        <h1>
          Welcome back
          <br />
          {user.firstName} {user.lastName}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <section className="accounts">
        {accounts.map((account, index) => (
          <Account key={index} account={account} />
        ))}
      </section>
    </main>
  )
}

export default Profile
