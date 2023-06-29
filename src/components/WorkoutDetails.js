import { useState } from "react";
import WorkoutData from './WorkoutData';
import icons from "../constants/icons";

import './styles/workoutDetails.css'

const WorkoutDetails = () => {
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

  const filteredData = combinedData.filter(workout => {
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

  return (
    <div>
      <div className="select-container">
  <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="select-box">
    <option value="">All Types</option>
    <option value="push">Push</option>
    <option value="pull">Pull</option>
    <option value="legs">Legs</option>
    <option value="cardio">Cardio</option>
  </select>
</div>


      {combinedData.length > 0 ? (
        <div className="workout-cards-container">
          {filteredData.map((workout) => (
            <div className={workoutVisibility[workout.id] ? "workout-card expanded" : "workout-card"} 
            key={workout.id} onClick={() => toggleDetails(workout.id)}>
              <div className="front">
              {/* <img src={icons.benchPress} alt="benchPress" className="" /> */}
              <img src={workout.imgUrl} />
                <h3>{workout.exerciseName}</h3>
                    {/* Add image here */}
              </div>
              <div className="back">
                <p>Description: {workout.description}</p>
                <p>Equipment: {workout.equipment}</p>
                <p>Duration: {workout.duration}</p>
                <p>Difficulty Level: {workout.difficultyLevel}</p>
                <p>Notes: {workout.additionalNotes}</p>
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

export default WorkoutDetails;
