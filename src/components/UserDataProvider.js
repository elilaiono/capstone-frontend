import React, { useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { auth } from '../config/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserCollectionData } from './FetchData';

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  const fetchUserData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const fetchedUserData = await fetchUserCollectionData("users", userId);
      setUserData(fetchedUserData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage("Error retrieving user data");
    }
  };

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData();
      } else {
        console.log("user is logged out")
      }
    });
  }, []);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserDataProvider;