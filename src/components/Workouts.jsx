
import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { auth } from '../config/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import WorkoutCards from "./WorkoutCards";
import WorkoutForm from "./WorkoutForm";
// import UserData from "./useUserData";
import UserContext from "../contexts/UserContext";
import '../styles/workouts.css'

const Workouts = ({}) => {
  // const { userData } = UserData();
  const userData = useContext(UserContext)
  const { reset } = useForm()
  
  const [image, setImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [message, setMessage] = useState("")

  useEffect(() => {
    console.log('selectedWorkout changed', selectedWorkout);
  }, [selectedWorkout]);
  

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  let onSubmit = async (data) => {
    // console.log('onSubmit called', data)
    let apiUrl;
    let method;
    let user;

    if (isUpdating) {
      setIsUpdating(false);
      setSelectedWorkout(null);
    }

    if (data.delete) {
      apiUrl = `http://localhost:8080/users/workouts/${auth.currentUser.uid}/${data.id}`;
      method = "DELETE";
    } else {
      apiUrl = data.id 
        ? `http://localhost:8080/users/workouts/${auth.currentUser.uid}/${data.id}`
        : "http://localhost:8080/users/workouts/add";
      method = data.id ? "PUT" : "POST";
      user = {
        ...data,
        userId: auth?.currentUser?.uid
      };
    }
  
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      try {
        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {}, 
            (error) => {
              console.error('Error uploading image:', error);
              reject(error);
            }, 
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              user.imgUrl = downloadURL;
              resolve();
            }
          );
        });
      } catch (error) {
        console.log('Error occurred while uploading the image');
      }
    }
    
    let res = await fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  
    if (res.status === 200) {
      if (data.delete) {
        console.log(`Workout deleted successfully`);
        setMessage("Workout deleted successfully");
      } else {
        console.log(`Workout was created/updated successfully`);
        setMessage(data.id ? "Workout updated successfully" : "Workout created successfully");
      }
      reset(); // Resetting the form
      setSelectedWorkout(null);  // Clear selected workout after successful update
      window.location.reload(); // Reloading the page
    } else {
      console.log(`An error occurred:`, res.status)
      setMessage("Some error occurred");
    }
  };
  
  return (
    <div className="workouts-container">
      <WorkoutCards
      selectedWorkout={selectedWorkout}
      setSelectedWorkout={setSelectedWorkout}
      onSubmit={onSubmit}
      />


      {message && <div className="message">{message}</div>}
      { userData ? (
        <div className="regUser">
      <WorkoutForm 
      initialValues={selectedWorkout || {}} 
      onSubmit={onSubmit} 
      buttonText={selectedWorkout ? "Update" : "Create"} 
      handleImageChange={handleImageChange} />
    </div> ) :
      null
}
    </div>
  );
};

export default Workouts;
