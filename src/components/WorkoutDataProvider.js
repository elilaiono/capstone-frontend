import React, { useState, useEffect } from "react";
import WorkoutContext from "../contexts/WorkoutContext";
import { auth } from '../config/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserWorkoutCollectionData, fetchBaseWorkoutCollectionData } from './FetchData';

const WorkoutDataProvider = ({ children }) => {
  const [workoutData, setWorkoutData] = useState(null);
  const [pushWorkouts, setPushWorkouts] = useState([])
  const [pullWorkouts, setPullWorkouts] = useState([])
  const [legWorkouts, setLegWorkouts] = useState([])
  const [cardioWorkouts, setCardioWorkouts] = useState([])
  const [message, setMessage] = useState("");

  const fetchBaseWorkouts =  () => {
    try {
        fetchBaseWorkoutCollectionData("push").then((pushWorkoutData) => {
          setPushWorkouts(pushWorkoutData)
        })
          
  
        fetchBaseWorkoutCollectionData("pull").then((pullWorkoutData) => {
          setPullWorkouts(pullWorkoutData)
        })
  
        fetchBaseWorkoutCollectionData("legs").then((legWorkoutData) => {
          setLegWorkouts(legWorkoutData)
        })
  
        fetchBaseWorkoutCollectionData("cardio").then((cardioWorkoutData) => {
          setCardioWorkouts(cardioWorkoutData)
        })
  
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setMessage("Error getting workouts")
      }
  }

  const fetchUserData = async () => {
    try {
        const userId = auth.currentUser.uid;
        const fetchedUserData = await fetchUserWorkoutCollectionData("users", "workouts", userId)
        setWorkoutData(fetchedUserData);
        // Store user data in local storage
        localStorage.setItem('userData', JSON.stringify(fetchedUserData));
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error retrieving user data");
      }
  };

  useEffect(() => {
    fetchBaseWorkouts();
  }, []);
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchUserData();
        } else {
          console.log("user is logged out")
        }
      });
     
  }, [])

  return (
    <WorkoutContext.Provider value={{ 
      workoutData,
      pushWorkouts,
      pullWorkouts,
      legWorkouts,
      cardioWorkouts
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutDataProvider;