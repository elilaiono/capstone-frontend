
import React, { useState, useEffect, useContext, useRef } from "react";
import { auth } from '../config/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import WorkoutCard from "./WorkoutCards";
import WorkoutForm from "./WorkoutForm";
import '../styles/form.css'
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material'

const Workouts = ({}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL

  const [image, setImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [message, setMessage] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const [showForm, setShowForm] = useState(false); // state to track whether form is shown
  const formRef = useRef(null); // reference to the form

  const handleClick = (workout) => {
    setSelectedWorkout(workout)
    setShowForm(true);
    window.setTimeout(() => {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setSelectedWorkout(null); // Clear selected workout after successful update
    window.location.reload(); // Reloading the page
  };


  let onSubmit = async (data) => {
    let apiUrl;
    let method;
    let user;

    if (isUpdating) {
      setIsUpdating(false);
      setSelectedWorkout(null);
    }

    if (data.delete) {
      apiUrl = `${baseUrl}/users/workouts/${auth.currentUser.uid}/${data.id}`;
      method = "DELETE";
    } else {
      apiUrl = data.id 
        ? `${baseUrl}/users/workouts/${auth.currentUser.uid}/${data.id}`
        : `${baseUrl}/users/workouts/add`;
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
        // setMessage(data.id ? "Workout updated successfully" : "Workout created successfully");
        setShowSuccessModal(true);
      }
     
    } else {
      console.log(`An error occurred:`, res.status)
      setMessage("Some error occurred");
    }
  };
  
  return (
    <div className="workouts-container">
      <WorkoutCard
      selectedWorkout={selectedWorkout}
      setSelectedWorkout={setSelectedWorkout}
      handleClick={handleClick}
      onSubmit={onSubmit}
      />

      <div ref={formRef}>
      { showForm && (
      <WorkoutForm 
      initialValues={selectedWorkout || {}}
      onSubmit={onSubmit} 
      buttonText={selectedWorkout ? "Update" : "Create"} 
      handleImageChange={handleImageChange}
      onSuccess={() => setShowSuccessModal(true)}
      />
      )}
      </div>
      <Dialog open={showSuccessModal} onClose={handleSuccessModalClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          Your Workout was successfully {selectedWorkout ? "updated" : "created"}!
          <Button variant="contained" color="primary" onClick={handleSuccessModalClose} fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workouts;
