import "./Profile.scss"
import { useQuery } from "@tanstack/react-query"
import { fetchUserProfile } from "../../api/auth"
import Account from "../../components/Account/Account"
import { fetchAccountsByUserId } from "../../api/accounts"

const Profile = () => {
  // 1. Always call the first useQuery
  const {
    data: userProfile,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    retry: false,
  })

  // 2. Always call the second useQuery — execution is deferred until userProfile is ready
  const {
    data:accounts,
    isLoading: isAccountsLoading,
    isError: isAccountsError,
    error: accountsError,
  } = useQuery({
    queryKey: ["accounts", userProfile?.id],
    queryFn: () => fetchAccountsByUserId(userProfile.id),
    enabled: !!userProfile?.id, // only runs when userProfile.id exists
  })

  // Loading/Error states
  if (isUserLoading) return <p>Loading user profile...</p>
  if (isUserError) return <p>Error: {userError.message}</p>
  if (isAccountsLoading) return <p>Loading accounts...</p>
  if (isAccountsError) return <p>Error: {accountsError.message}</p>

console.log('userProfile.id :>> ', userProfile.id);
  return (
    <main className="container__profile">
      <div className="container__profile__header">
        <h1>
          Welcome back
          <br />
          {userProfile.firstName} {userProfile.lastName}
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
