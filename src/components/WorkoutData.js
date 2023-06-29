import { useState, useEffect } from "react";
import { auth } from '../config/firebase';
import { fetchUserCollectionData, fetchBaseWorkoutCollectionData } from './FetchData';

const WorkoutData = () => {
  const [pushWorkouts, setPushWorkouts] = useState([])
  const [pullWorkouts, setPullWorkouts] = useState([])
  const [legWorkouts, setLegWorkouts] = useState([])
  const [cardioWorkouts, setCardioWorkouts] = useState([])

  const [workoutData, setWorkoutData] = useState([]);
  const [message, setMessage] = useState("");

  const fetchBaseWorkouts = async () => {
    try {
      const pushWorkoutData = await fetchBaseWorkoutCollectionData("push")
      setPushWorkouts(pushWorkoutData)

      const pullWorkoutData = await fetchBaseWorkoutCollectionData("pull")
      setPullWorkouts(pullWorkoutData)

      const legWorkoutData = await fetchBaseWorkoutCollectionData("legs")
      setLegWorkouts(legWorkoutData)

      const cardioWorkoutData = await fetchBaseWorkoutCollectionData("cardio")
      setCardioWorkouts(cardioWorkoutData)

    } catch (error) {
      console.error("Error fetching workouts:", error);
      setMessage("Error getting workouts")
    }
  }

  const fetchUserData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const fetchedUserData = await fetchUserCollectionData("userWorkout", userId);
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
    if (auth.currentUser) {
      fetchUserData();
    }
  }, []);

  // useEffect(() => {
  //   console.log("ALL PULL WORKOUTS:", pullWorkouts);
  // }, [pullWorkouts]);
  
  return { 
    workoutData,
    pushWorkouts,
    pullWorkouts,
    legWorkouts,
    cardioWorkouts
  }; // Return the userData state
};

export default WorkoutData;




