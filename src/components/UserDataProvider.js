import React, { useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { auth } from '../config/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserCollectionData, fetchUserSubCollectionData } from './FetchData';

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [goalData, setGoalData] = useState([]);
  const [personalRecordData, SetPersonalRecordData] = useState([]);
  const [progressPictureData, setProgressPictureData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [workoutLogData, setWorkoutLogData] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUserData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const fetchedUserData = await fetchUserCollectionData("users", userId);
      setUserData(fetchedUserData);
      localStorage.setItem('userData', JSON.stringify(fetchedUserData));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage("Error retrieving user data");
    }
  };

  const fetchSubCollectionData = () => {
    try {
        const userId = auth.currentUser.uid;

        fetchUserSubCollectionData("users", "goals", userId).then((goalData) => {
          setGoalData(goalData);
        })
        fetchUserSubCollectionData("users", "personal-records", userId).then((prData) => {
          SetPersonalRecordData(prData);
        })
        fetchUserSubCollectionData("users", "progress-pictures", userId).then((picData) => {
          setProgressPictureData(picData);
        })
        fetchUserSubCollectionData("users", "weights", userId).then((weightData) => {
          setWeightData(weightData);
        })
        fetchUserSubCollectionData("users", "workout-logs", userId).then((logData) => {
          setWorkoutLogData(logData);
        })


      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error retrieving user data");
      }
  };



  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData();
        fetchSubCollectionData();
      } else {
        // console.log("user is logged out")
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{
      userData,
      goalData,
      personalRecordData,
      progressPictureData,
      weightData,
      workoutLogData
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserDataProvider;
