import "./Profile.scss"
import profiles from "../../__mocks__/profiles.json"
import Account from "../../components/Account/Account"

const Profile = () => {
  if (!profiles) return

  const profile = profiles
  const accounts = profile.account

  return (
    <main className="container__profile">
      <div className="container__profile__header">
        <h1>
          Welcome back
          <br />
          {profile.firstName} {profile.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <section className="accounts">
        {accounts.map((account,index)=>(
            <Account key={index} account={account} />
        ))}
      </section>
    </main>
  )
}

export default Profile
