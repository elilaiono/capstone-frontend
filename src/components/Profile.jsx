// import UserData from "./useUserData";
import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

const Profile = () => {
  // const { userData } = UserData();
  const userData = useContext(UserContext)

  return (
      <div>        
      {userData ? (
        <div>
          <h3>{userData.firstName}</h3>
          <h3>{userData.lastName}</h3>
          <h3>{userData.email}</h3>
        </div>
      ) : null}
      {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
   
  );
};

export default Profile;
