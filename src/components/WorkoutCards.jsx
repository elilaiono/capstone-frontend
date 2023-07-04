import { useState } from "react";
import { auth } from "../config/firebase";
import WorkoutData from './WorkoutData';
import UserData from "./useUserData";

import '../styles/workoutCards.css'

const WorkoutCards = ({ selectedWorkout, setSelectedWorkout }) => {
  const { userData } = UserData();
  const baseUrl = process.env.REACT_APP_BASE_URL

  const { 
    workoutData,
    pushWorkouts,
    pullWorkouts,
    legWorkouts,
    cardioWorkouts
  } = WorkoutData();
  
  const [filterType, setFilterType] = useState("");
  const [workoutVisibility, setWorkoutVisibility] = useState({}); // State for workout visibility

  // Combine base workouts and user workouts
  const combinedData = [
    ...pushWorkouts, 
    ...workoutData,
    ...pullWorkouts,
    ...legWorkouts,
    ...cardioWorkouts
  ];

  const filteredData = filterType === "yourWorkouts" ? workoutData : combinedData.filter(workout => {
    if (filterType === "") {
      return true; // No filter applied, include all workouts
    } else {
      return workout.type === filterType; // Filter by workout type
    }
  });

  const toggleDetails = (workoutId) => {
    setWorkoutVisibility(prevVisibility => ({
      ...prevVisibility,
      [workoutId]: !prevVisibility[workoutId] // Toggle the visibility of workout details
    }));
  }

  const deleteWorkout = async (workoutId) => {
    const apiUrl = `${baseUrl}/users/workouts/${auth.currentUser.uid}/${workoutId}`;
  
    let res = await fetch(apiUrl, {
      method: "DELETE",
    });
  
    if (res.status === 200) {
      console.log(`Workout deleted successfully`);
      // Code to refresh the list of workouts or navigate away
      window.location.reload(); // Reloading the page
    } else {
      console.log(`An error occurred while deleting the workout`);
    }
  };


  return (
    <div>
      <div className="select-container">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="select-box">
          <option value="">All Types</option>
          <option value="push">Push</option>
          <option value="pull">Pull</option>
          <option value="legs">Legs</option>
          <option value="cardio">Cardio</option>
          {userData ? <option value="yourWorkouts">Your Workouts</option> : null }
        </select>
      </div>

      {combinedData.length > 0 ? (
        <div className="workout-cards-container">
          {filteredData.map((workout) => (
            <div className={workoutVisibility[workout.id] ? "workout-card expanded" : "workout-card"} 
            key={workout.id} onClick={() => toggleDetails(workout.id)}>
              <div className="front">
                <img src={workout.imgUrl ? workout.imgUrl : 'https://loremflickr.com/320/240'} alt="benchPress" />
                <h3 className="workout-name">{workout.exerciseName}</h3>
              </div>
              <div className="back">
                <div className="content">
                <p>{workout.description}</p>
                <p>Equipment: {workout.equipment}</p>
                <p>Duration: {workout.duration}</p>
                <p>Difficulty Level: {workout.difficultyLevel}</p>
                <p>Notes: {workout.additionalNotes}</p>
                </div>

                { (workoutData.find(w => w.id === workout.id)) &&
                  <div className="actions">
                    <button onClick={(e) => {
                      e.stopPropagation();
                      console.log("what the f", workout)
                      setSelectedWorkout(workout);
                    }}>Update</button>

                    <button onClick={(e) => {
                      e.stopPropagation();
                      deleteWorkout(workout.id);
                    }}>Delete</button>
                  </div>
                  }
              </div>
            </div>
            ))}
        </div>
      ) : (
        <p>No workout data available.</p>
      )}
    </div>
  );
};

export default WorkoutCards;
