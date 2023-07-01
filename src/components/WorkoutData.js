import { useState, useEffect } from "react";
import { auth } from '../config/firebase';
import { fetchUserWorkoutCollectionData, fetchBaseWorkoutCollectionData } from './FetchData';
import { onAuthStateChanged } from "firebase/auth";

const WorkoutData = () => {
  const [pushWorkouts, setPushWorkouts] = useState([])
  const [pullWorkouts, setPullWorkouts] = useState([])
  const [legWorkouts, setLegWorkouts] = useState([])
  const [cardioWorkouts, setCardioWorkouts] = useState([])

  const [workoutData, setWorkoutData] = useState([]);
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
  
  // useEffect(() => {
  //   if (auth.currentUser) {
  //     console.log(auth.currentUser)
  //     fetchUserData();
  //   }
  // },[auth])

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid;
          // // ...
          // console.log("uid", uid)
          fetchUserData();
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
}, [])
  
  return { 
    workoutData,
    pushWorkouts,
    pullWorkouts,
    legWorkouts,
    cardioWorkouts
  }; // Return the userData state
};

export default WorkoutData;




