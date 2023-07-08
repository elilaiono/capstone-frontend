import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import GoalForm from "./GoalForm";
import PersonalRecordForm from "./PersonalRecordForm";
import UploadProgressPicForm from "./UploadProgressPic";
import WeightTrackerForm from "./WeightTrackerForm";
import WorkoutLogForm from "./WorkoutLogForm";
import { auth } from "../config/firebase";
import { useForm } from "react-hook-form";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Progress = () => {
    const userData = useContext(UserContext)
    const [image, setImage] = useState(null);
    const { reset } = useForm();
    const baseUrl = process.env.REACT_APP_BASE_URL;

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
        <div>
            { userData ? (
              <>
                <GoalForm onSubmit={(data) => onSubmit(data, "goals")} />
                <PersonalRecordForm onSubmit={(data) => onSubmit(data, "personal-records")} />
                <UploadProgressPicForm onSubmit={(data) => onSubmit(data, "progress-pictures")} />
                <WeightTrackerForm onSubmit={(data) => onSubmit(data, "weights")} />
                <WorkoutLogForm onSubmit={(data) => onSubmit(data, "workout-logs")} />

              </>
            ) : null }
    
            </div>
     );
}
 
export default Progress;