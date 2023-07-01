import { useState } from "react";
import { auth } from '../config/firebase';
import WorkoutDetails from "./WorkoutDetails";

import icons from "../constants/icons";

import './styles/workouts.css'

const Workouts = () => {

  const [exerciseName, setExerciseName] = useState("");
  const [description, setDescription] = useState("");
  const [equipment, setEquipment] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [type, setType] = useState(""); // New state for type
  const [message, setMessage] = useState("")

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        exerciseName: exerciseName,
        description: description,
        equipment: equipment,
        difficultyLevel: difficultyLevel,
        duration: duration,
        additionalNotes: additionalNotes,
        type: type, // Include type in the user object
        userId: auth?.currentUser?.uid
      };

      let res = await fetch("http://localhost:8080/userWorkout/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.status === 200) {
        setExerciseName("");
        setDescription("");
        setEquipment("");
        setDifficultyLevel("")
        setDuration("");
        setAdditionalNotes("");
        setType(""); // Reset the type state
        setMessage("User created successfully");
      } else {
        setMessage("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="workouts-container">
      
      <WorkoutDetails />

      <div className="regUser">


        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={exerciseName}
            placeholder="Exercise Name..."
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <input
            type="text"
            value={description}
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            value={equipment}
            placeholder="Equipment..."
            onChange={(e) => setEquipment(e.target.value)}
          />
          <input
            type="text"
            value={difficultyLevel}
            placeholder="Difficulty Level"
            onChange={(e) => setDifficultyLevel(e.target.value)}
          />
          <input
            type="text"
            value={duration}
            placeholder="Duration"
            onChange={(e) => setDuration(e.target.value)}
          />
          <input
            type="text"
            value={additionalNotes}
            placeholder="Additional Notes"
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="push">Push</option>
            <option value="pull">Pull</option>
            <option value="legs">Legs</option>
            <option value="cardio">Cardio</option>
          </select>

          <button type="submit">Create</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>


    </div>
  );
};

export default Workouts;
