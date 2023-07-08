// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { auth } from '../config/firebase';

// const WeightTrackerForm = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
// //   const [message, setMessage] = useState("");
//   const baseUrl = process.env.REACT_APP_BASE_URL

//   const onSubmit = async (data) => {
//     const apiUrl = `${baseUrl}/users/weights/add`;
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
//       console.log(`Weight was updated successfully`);
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
//   <div className="form-card">
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label htmlFor="weight">Current Weight {errors.weight && <span className="error-message">*</span>}</label>
//       <input id="weight" {...register("weight", { required: true })} placeholder="Current Weight" />

//       <label htmlFor="weightDate">Date {errors.weightDate && <span className="error-message">*</span>}</label>
//       <input id="weightDate" {...register("weightDate", { required: true })} type="date" />

//       <button type="submit">Submit</button>
//     </form>
//   </div>
// </div>

//   );
// };

// export default WeightTrackerForm;

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Card, Box } from "@mui/material";

const WeightTrackerForm = ({ initialValues, onSubmit, buttonText, updating }) => {
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
          Weight Tracker
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Controller
            name="weight"
            control={control}
            defaultValue=""
            rules={{ required: "Weight is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="weight"
                label="Current Weight"
                sx={{ my: 1 }}
                variant="outlined"
                error={!!errors.weight}
                helperText={errors.weight?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="weightDate"
            control={control}
            defaultValue=""
            rules={{ required: "Date is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="weightDate"
                label="Date"
                sx={{ my: 1 }}
                type="date"
                variant="outlined"
                error={!!errors.weightDate}
                helperText={errors.weightDate?.message}
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

export default WeightTrackerForm;
