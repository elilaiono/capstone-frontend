// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { auth } from '../config/firebase';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


// const UploadProgressPicForm = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
// //   const [message, setMessage] = useState("");
//   const [image, setImage] = useState(null);
//   const baseUrl = process.env.REACT_APP_BASE_URL

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const onSubmit = async (data) => {
//     const apiUrl = `${baseUrl}/users/progress-pictures/add`;
//     const method = "POST";
//     const user = {
//       ...data,
//       userId: auth?.currentUser?.uid
//     };

//     if (image) {
//         const storage = getStorage();
//         const storageRef = ref(storage, `progress-pic/${image.name}`);
//         const uploadTask = uploadBytesResumable(storageRef, image);
    
//         try {
//           await new Promise((resolve, reject) => {
//             uploadTask.on('state_changed', 
//               (snapshot) => {}, 
//               (error) => {
//                 console.error('Error uploading image:', error);
//                 reject(error);
//               }, 
//               async () => {
//                 const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//                 user.imgUrl = downloadURL;
//                 resolve();
//               }
//             );
//           });
//         } catch (error) {
//           console.log('Error occurred while uploading the image');
//         }
//       }
    
//     let res = await fetch(apiUrl, {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });
  
//     if (res.status === 200) {
//       console.log(`Progress Pic uploaded successfully`);
//     //   setMessage("Goal created successfully");
//       reset();
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
//       <label htmlFor="upload">Upload Image</label>
//       <input id="upload" type="file" onChange={handleImageChange} />

//       <label htmlFor="picDate">Picture Date {errors.picDate && <span className="error-message">*</span>}</label>
//       <input id="picDate" {...register("picDate", { required: true })} type="date" />

//       <label htmlFor="notes">Notes</label>
//       <textarea id="notes" {...register("notes")} placeholder="Notes"></textarea>

//       <button type="submit">Submit</button>
//     </form>
//   </div>
// </div>

//   );
// };

// export default UploadProgressPicForm;

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Card, Box, Input } from "@mui/material";

const UploadProgressPicForm = ({ initialValues, onSubmit, buttonText, updating }) => {
  const { handleSubmit, formState: { errors }, control, reset } = useForm();
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");


  // reset form values when initialValues change
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitForm = async (data) => {
    if (onSubmit) {
      data.image = image;
      await onSubmit(data);
    }
    reset();
    setFileName("");
  }

  return (
    <Box className="workout-form-container">
      <Card className="form-card">
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mt: 2 }}>
          Upload Progress Picture
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)}>
        <Box>
        <Controller
            control={control}
            name="file"
            render={({ field }) => (
              <Box>
                <Button variant="outlined" component="label" color="primary" sx={{ py: 1, px: 1 }}>
                  Upload File
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      field.onChange(e.target.files[0]); // inform react-hook-form of the change
                      setFileName(e.target.files[0].name); // set the file name for display
                      handleImageChange(e); // your existing file handling function
                    }}
                  />
                </Button>
                {/* {fileName && <Typography variant="subtitle1">Chosen file: {fileName}</Typography>} */}
              </Box>
            )}
          />
                {fileName && <Typography variant="subtitle1">Chosen file: {fileName}</Typography>}
              </Box>

          <Controller
            name="picDate"
            control={control}
            defaultValue=""
            rules={{ required: "Picture date is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="picDate"
                label="Picture Date"
                sx={{ my: 1 }}
                type="date"
                variant="outlined"
                error={!!errors.picDate}
                helperText={errors.picDate?.message}
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

export default UploadProgressPicForm;

