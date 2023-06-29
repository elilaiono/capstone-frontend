import { useState } from "react";
import WorkoutData from './WorkoutData';

const WorkoutDetails = () => {
  const { pushWorkouts, workoutData } = WorkoutData();
  
  const [filterType, setFilterType] = useState(""); // New state for filter type

  // Combine base workouts and user workouts
  const combinedData = [...pushWorkouts, ...workoutData];

  const filteredData = combinedData.filter(workout => {
    if (filterType === "") {
      return true; // No filter applied, include all workouts
    } else {
      return workout.type === filterType; // Filter by workout type
    }
  });

  return (
    <div>
      <div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="push">Push</option>
          <option value="pull">Pull</option>
          <option value="legs">Legs</option>
          <option value="cardio">Cardio</option>
        </select>
      </div>

      {combinedData.length > 0 ? (
        <div>
          {filteredData.map((workout) => (
            <div key={workout.id}>
              <h3>Exercise Name: {workout.exerciseName}</h3>
              <p>Description: {workout.description}</p>
              <p>Equipment: {workout.equipment}</p>
              <p>Duration: {workout.duration}</p>
              <p>Difficulty Level: {workout.difficultyLevel}</p>
              <p>Notes: {workout.additionalNotes}</p>
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


