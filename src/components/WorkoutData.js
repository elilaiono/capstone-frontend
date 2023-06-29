import { useState, useEffect } from "react";
import { auth } from '../config/firebase';
import { fetchUserCollectionData, fetchBaseWorkoutCollectionData } from './FetchData';

const WorkoutData = () => {
  const [pushWorkouts, setPushWorkout] = useState([])

  const [workoutData, setWorkoutData] = useState([]);
  const [message, setMessage] = useState("");

  const fetchBaseWorkouts = async () => {
    try {
      const pushWorkoutData = await fetchBaseWorkoutCollectionData("push")
      setPushWorkout(pushWorkoutData)
      // console.log("ALL PUSH WORKOUTS:", pushWorkouts)
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

  useEffect(() => {
    console.log("ALL PUSH WORKOUTS:", pushWorkouts);
  }, [pushWorkouts]);



  return { workoutData, pushWorkouts }; // Return the userData state
};

export default WorkoutData;




