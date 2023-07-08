// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { auth } from '../config/firebase';

// const WorkoutLogForm = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
// //   const [message, setMessage] = useState("");
//   const baseUrl = process.env.REACT_APP_BASE_URL

//   const onSubmit = async (data) => {
//     const apiUrl = `${baseUrl}/users/workout-logs/add`;
//     const method = "POST";
//     const user = {
//       ...data,
//       userId: auth?.currentUser?.uid
//     };
    
//     let res = await fetch(apiUrl, {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });
  
//     if (res.status === 200) {
//       console.log(`Workout Log was created successfully`);
//     //   setMessage("Goal created successfully");
//       reset(); // Resetting the form
//       // You may also want to add some action to refresh your goals list here
//     } else {
//       console.log(`An error occurred:`, res.status)
//     //   setMessage("Some error occurred");
//     }
//   };
  

//   return (
//     <div className="workout-form-container">
//     <div className="form-card">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <label htmlFor="workoutDate">Workout Date {errors.workoutDate && <span className="error-message">*</span>}</label>
//         <input id="workoutDate" {...register("workoutDate", { required: true })} type="date" />
  
//         <label htmlFor="workout">Workout {errors.workout && <span className="error-message">*</span>}</label>
//         <input id="workout" {...register("workout", { required: true })} placeholder="Workout" />
  
//         <label htmlFor="notes">Notes</label>
//         <textarea id="notes" {...register("notes")} placeholder="Notes"></textarea>
  
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   </div>
  
//   );
// };

// export default WorkoutLogForm;

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Card, Box } from "@mui/material";

const WorkoutLogForm = ({ initialValues, onSubmit, buttonText, updating }) => {
  const { handleSubmit, formState: { errors }, control, reset } = useForm();

  // reset form values when initialValues change
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const onSubmitForm = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
    reset();  // reset the form after submission
  }

  return (
    <Box className="workout-form-container">
      <Card className="form-card">
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mt: 2 }}>
          Workout Log
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Controller
            name="workoutDate"
            control={control}
            defaultValue=""
            rules={{ required: "Workout date is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="workoutDate"
                label="Workout Date"
                sx={{ my: 1 }}
                type="date"
                variant="outlined"
                error={!!errors.workoutDate}
                helperText={errors.workoutDate?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="workout"
            control={control}
            defaultValue=""
            rules={{ required: "Workout is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="workout"
                label="Workout"
                sx={{ my: 1 }}
                variant="outlined"
                error={!!errors.workout}
                helperText={errors.workout?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="notes"
            control={control}
            defaultValue=""
            render={({ field }) =>
              <TextField
                {...field}
                id="notes"
                label="Notes"
                sx={{ my: 1 }}
                variant="outlined"
                multiline
                fullWidth
              />
            }
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default WorkoutLogForm;
