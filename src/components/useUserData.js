import { useState, useEffect } from "react";
import { auth } from '../config/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { fetchUserCollectionData } from './FetchData';
import { onAuthStateChanged } from "firebase/auth";


 const UserData = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  // console.log(userData);
  const fetchUserData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userData = await fetchUserCollectionData("users", userId); // Pass the collection name and userId
      setUserData(userData);
      
      // Store user data in local storage
      // localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage("Error retrieving user data");
    }
  };

  // useEffect(() => {
  //   if (auth.currentUser) {
  //     fetchUserData();
  //   }
  // }, []);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid;
          // ...
          // console.log("uid", uid)
          fetchUserData();
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
}, [])

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      // Clear user data from local storage
      // localStorage.removeItem('userData');
      setUserData(null);
      navigate('/');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { userData, handleLogout };
};

export default UserData


