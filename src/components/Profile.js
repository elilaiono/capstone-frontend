import UserData from "./UserData";

const Profile = () => {
  const { userData, handleLogout } = UserData();

  return (
      <div>        
      {userData ? (
        <div>
          <h3>{userData.firstName}</h3>
          <h3>{userData.lastName}</h3>
          <h3>{userData.email}</h3>
        </div>
      ) : null}
      <button onClick={handleLogout}>Logout</button>
      </div>
   
  );
};

export default Profile;
