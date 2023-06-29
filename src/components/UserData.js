import { useState, useEffect } from "react";
import { auth } from '../config/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { fetchUserCollectionData } from './FetchData';

 const UserData = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  const fetchUserData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userData = await fetchUserCollectionData("users", userId); // Pass the collection name and userId
      setUserData(userData);
      // Store user data in local storage
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage("Error retrieving user data");
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchUserData();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      // Clear user data from local storage
      localStorage.removeItem('userData');
      setUserData(null);
      navigate('/');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { userData, handleLogout };
};

export default UserData
