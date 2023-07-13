
import React, { useState, useContext, useRef } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UserContext from "../contexts/UserContext";
import GoalForm from "./GoalForm";
import PersonalRecordForm from "./PersonalRecordForm";
import UploadProgressPicForm from "./UploadProgressPic";
import WeightTrackerForm from "./WeightTrackerForm";
import WorkoutLogForm from "./WorkoutLogForm";
import GoalCard from "./GoalCard";
import PersonalRecordCard from "./PersonalRecordCard";
import ProgressPictureCard from "./ProgressPictureCard";
import WeightTrackerCard from "./WeightTrackerCard";
import WorkoutLogCard from "./WorkoutLogCard";
import { auth } from "../config/firebase";
import { useForm } from "react-hook-form";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themes.js'; 

const Progress = () => {

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { reset } = useForm();
  const { userData } = useContext(UserContext)
  const [showForm, setShowForm] = useState({
    goal: false,
    personalRecord: false,
    progressPic: false,
    weight: false,
    workoutLog: false
  });

  // Create references for each form section
  const goalFormRef = useRef(null);
  const personalRecordFormRef = useRef(null);
  const progressPicFormRef = useRef(null);
  const weightFormRef = useRef(null);
  const workoutLogFormRef = useRef(null);

  const formRefs = {
    goal: goalFormRef,
    personalRecord: personalRecordFormRef,
    progressPic: progressPicFormRef,
    weight: weightFormRef,
    workoutLog: workoutLogFormRef,
  };

  // Update the visibility of the form and scroll to the form section
  const handleNewButtonClick = (formType) => {
    setShowForm(prevState => ({ ...prevState, [formType]: !prevState[formType] }));
    formRefs[formType].current.scrollIntoView({ behavior: 'smooth' });
  };

     const onSubmit = async (data, formType) => {
      let apiUrl = "";
      let successMessage = "";
      switch (formType) {
          case "goals":
              apiUrl = `${baseUrl}/users/goals/add`;
              successMessage = "Goal was created successfully";
              break;
          case "personal-records":
              apiUrl = `${baseUrl}/users/personal-records/add`;
              successMessage = "Personal Record was created successfully";
              break;
          case "progress-pictures":
              apiUrl = `${baseUrl}/users/progress-pictures/add`;
              successMessage = "Progress Pic uploaded successfully";
              break;
          case "weights":
              apiUrl = `${baseUrl}/users/weights/add`;
              successMessage = "Weight was updated successfully";
              break;
          case "workout-logs":
              apiUrl = `${baseUrl}/users/workout-logs/add`;
              successMessage = "Workout Log was created successfully";
              break;
          default:
              throw new Error("Invalid form type");
      }
  
      const user = {
        ...data,
        userId: auth?.currentUser?.uid
      };
  
      let image = data.image;
      if (image && formType === "progress-pictures") {
          const storage = getStorage();
          const storageRef = ref(storage, `progress-pic/${image.name}`);
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    
      if (res.status === 200) {
        console.log(successMessage);
        reset(); // Resetting the form
        // You may also want to add some action to refresh your goals list here
      } else {
        console.log(`An error occurred:`, res.status);
      //   setMessage("Some error occurred");
      }
    };
  
  return (
<ThemeProvider theme={theme}>
  <Container>
    <Box my={4}>
      <Typography variant="h2" align="center" gutterBottom color="black">
        Progress Tracker
      </Typography>
      <Typography variant="h6" align="center" gutterBottom color="text.secondary">
        Track your fitness journey, one step at a time. 
        Log your workouts, weight changes, personal records, and even your progress pictures here. 
        Remember, consistency is key! 
      </Typography>
    </Box>

    { userData ? (
      <Box>
        {/* Goal Section */}
        <Card sx={{ my: 2, p: 2, backgroundColor: '#F8F8F8', }}>
          <CardContent>
            <section ref={goalFormRef}>
              <Typography variant="h4" gutterBottom color="black">
                Goals
              </Typography>
              <Typography variant="body1" gutterBottom color="text.test">
                What's a journey without a destination? Set your fitness goals here and make them happen.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleNewButtonClick('goal')}>
                {showForm.goal ? "Hide" : "Create New"} Goal
              </Button>
              {showForm.goal && <GoalForm onSubmit={(data) => onSubmit(data, "goals")} />}
              <GoalCard />
            </section>
          </CardContent>
        </Card>

        {/* Personal Record Section */}
        <Card sx={{ my: 2, p: 2, backgroundColor: '#F8F8F8' }}>
          <CardContent>
            <section ref={personalRecordFormRef}>
              <Typography variant="h4" gutterBottom color="black">
                Personal Records
              </Typography>
              <Typography variant="body1" gutterBottom color="text.test">
                Record your achievements. Every bit of progress counts!
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleNewButtonClick('personalRecord')}>
                {showForm.personalRecord ? "Hide" : "Create New"} Personal Record
              </Button>
              {showForm.personalRecord && <PersonalRecordForm onSubmit={(data) => onSubmit(data, "personal-records")} />}
              <PersonalRecordCard  />
            </section>
          </CardContent>
        </Card>

        {/* Progress Picture Section */}
        <Card sx={{ my: 2, p: 2, backgroundColor: '#F8F8F8' }}>
          <CardContent>
            <section ref={progressPicFormRef}>
              <Typography variant="h4" gutterBottom color="black">
                Progress Pictures
              </Typography>
              <Typography variant="body1" gutterBottom color="text.test">
                A picture is worth a thousand words. See your transformation!
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleNewButtonClick('progressPic')}>
                {showForm.progressPic ? "Hide" : "Upload New"} Progress Picture
              </Button>
              {showForm.progressPic && <UploadProgressPicForm onSubmit={(data) => onSubmit(data, "progress-pictures")} />}
              <ProgressPictureCard />
            </section>
          </CardContent>
        </Card>

        {/* Weight Tracker Section */}
        <Card sx={{ my: 2, p: 2, backgroundColor: '#F8F8F8' }}>
          <CardContent>
            <section ref={weightFormRef}>
              <Typography variant="h4" gutterBottom color="black">
                Weight Tracker
              </Typography>
              <Typography variant="body1" gutterBottom color="text.secondary">
                Monitor your weight changes over time. Remember, it's not always about the scale!
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleNewButtonClick('weight')}>
                {showForm.weight ? "Hide" : "Add New"} Weight
              </Button>
              {showForm.weight && <WeightTrackerForm onSubmit={(data) => onSubmit(data, "weights")} />}
              <WeightTrackerCard />
            </section>
          </CardContent>
        </Card>

        {/* Workout Log Section */}
        <Card sx={{ my: 2, p: 2, backgroundColor: "#F8F8F8" }}>
          <CardContent>
            <section ref={workoutLogFormRef}>
              <Typography variant="h4" gutterBottom color="black">
                Workout Logs
              </Typography>
              <Typography variant="body1" gutterBottom color="black">
                Keep a record of your workouts. It's satisfying to see how far you've come!
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleNewButtonClick('workoutLog')}>
                {showForm.workoutLog ? "Hide" : "Create New"} Workout Log
              </Button>
              {showForm.workoutLog && <WorkoutLogForm onSubmit={(data) => onSubmit(data, "workout-logs")} />}
              <WorkoutLogCard />
            </section>
          </CardContent>
        </Card>
      </Box>
    ) : (
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom color="primary.main">
          Please Log in to Start Tracking Your Progress
        </Typography>
        <Typography variant="body1" align="center" gutterBottom color="text.secondary">
          With an account, you can start logging your workouts, weights, personal records, and progress pictures. 
          Not a member yet? Sign up and start your fitness journey with us!
        </Typography>
      </Box>
    )}
  </Container>
</ThemeProvider>

  );
}

export default Progress;
