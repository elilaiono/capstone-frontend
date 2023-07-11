// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { auth } from '../config/firebase';

// const PersonalRecordForm = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
// //   const [message, setMessage] = useState("");
//   const baseUrl = process.env.REACT_APP_BASE_URL

//   // const onSubmit = async (data) => {
//   //   const apiUrl = `${baseUrl}/users/personal-records/add`;
//   //   const method = "POST";
//   //   const user = {
//   //     ...data,
//   //     userId: auth?.currentUser?.uid
//   //   };
    
//   //   let res = await fetch(apiUrl, {
//   //     method: method,
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify(user),
//   //   });
  
//   //   if (res.status === 200) {
//   //     console.log(`Personal Record was created successfully`);
//   //   //   setMessage("Goal created successfully");
//   //     reset(); // Resetting the form
//   //     // You may also want to add some action to refresh your goals list here
//   //   } else {
//   //     console.log(`An error occurred:`, res.status)
//   //   //   setMessage("Some error occurred");
//   //   }
//   // };
  

//   return (
//     <div className="workout-form-container">
//   <div className="form-card">
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label htmlFor="title">Title {errors.title && <span className="error-message">*</span>}</label>
//       <input id="title" {...register("title", { required: true })} placeholder="Title" />

//       <label htmlFor="previousRecord">Previous Record</label>
//       <input id="previousRecord" {...register("previousRecord")} placeholder="Previous Record" />

//       <label htmlFor="newRecord">New Record</label>
//       <input id="newRecord" {...register("newRecord")} placeholder="New Record" />

//       <label htmlFor="recordDate">Record Date {errors.recordDate && <span className="error-message">*</span>}</label>
//       <input id="recordDate" {...register("recordDate", { required: true })} type="date" />

//       <label htmlFor="notes">Notes</label>
//       <textarea id="notes" {...register("notes")} placeholder="Notes"></textarea>

//       <button type="submit">Submit</button>
//     </form>
//   </div>
// </div>

//   );
// };

// export default PersonalRecordForm;

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Card, Box } from "@mui/material";

const PersonalRecordForm = ({ initialValues, onSubmit, buttonText, updating }) => {
  const { handleSubmit, formState: { errors }, control, reset } = useForm();

  // reset form values when initialValues change
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const onSubmitForm = (data) => {
    onSubmit(data);
    reset();  // reset the form after submission
  }

  return (
    <Box className="workout-form-container">
      <Card className="form-card">
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mt: 2 }}>
          Personal Record
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: "Title is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="title"
                label="Title"
                sx={{ my: 2, mx: 0 }}
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="previousRecord"
            control={control}
            defaultValue=""
            render={({ field }) =>
              <TextField
                {...field}
                id="previousRecord"
                label="Previous Record"
                sx={{ my: 1 }}
                variant="outlined"
                fullWidth
              />
            }
          />

          <Controller
            name="newRecord"
            control={control}
            defaultValue=""
            render={({ field }) =>
              <TextField
                {...field}
                id="newRecord"
                label="New Record"
                sx={{ my: 1 }}
                variant="outlined"
                fullWidth
              />
            }
          />

          <Controller
            name="recordDate"
            control={control}
            defaultValue=""
            rules={{ required: "Record date is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="recordDate"
                label="Record Date"
                sx={{ my: 1 }}
                type="date"
                variant="outlined"
                error={!!errors.recordDate}
                helperText={errors.recordDate?.message}
                fullWidth
                InputLabelProps={{shrink: true}}
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

export default PersonalRecordForm;

