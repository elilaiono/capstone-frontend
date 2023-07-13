
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Card, Typography,
 } from "@mui/material";

function WorkoutForm({ initialValues, onSubmit, buttonText, handleImageChange, updating, onSuccess }) {
  const { handleSubmit, formState: { errors }, control, reset,} = useForm();
  const [fileName, setFileName] = useState("");

  // reset form values when initialValues change
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  // const handleSubmitWithSuccess = async (data) => {
  //   await onSubmit(data);
  //   setShowSuccessModal(true);
  //   if (onSuccess) {
  //     onSuccess(); // Call the onSuccess callback passed from the parent component
  //   }
  // };

  // const onChange = (files) => {
  //   if (files.length) {
  //     setFileName(files[0].name);
  //   } else {
  //     setFileName("");
  //   }
  // };

  return (
    // <div>
    <Box className="workout-form-container">
      <Card className="form-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="exerciseName"
            control={control}
            defaultValue=""
            rules={{ required: "Exercise name is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="exerciseName"
                label="Exercise Name"
                sx={{ my: 1 }}
                // variant="outlined"
                error={!!errors.exerciseName}
                helperText={errors.exerciseName?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Description is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="description"
                label="Description"
                sx={{ my: 1}}
                variant="outlined"
                multiline
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="equipment"
            control={control}
            defaultValue=""
            rules={{ required: "Equipment is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="equipment"
                label="Equipment"
                sx={{ my: 1 }}
                variant="outlined"
                error={!!errors.equipment}
                helperText={errors.equipment?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="difficultyLevel"
            control={control}
            defaultValue=""
            rules={{ required: "Difficulty Level is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="difficultyLevel"
                label="Difficulty Level"
                sx={{ my: 1 }}
                variant="outlined"
                error={!!errors.difficultyLevel}
                helperText={errors.difficultyLevel?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="duration"
            control={control}
            defaultValue=""
            rules={{ required: "Duration is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="duration"
                label="Duration"
                sx={{ my: 1 }}
                variant="outlined"
                error={!!errors.duration}
                helperText={errors.duration?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="additionalNotes"
            control={control}
            defaultValue=""
            render={({ field }) =>
              <TextField
                {...field}
                id="additionalNotes"
                label="Additional Notes"
                sx={{ my: 1 }}
                variant="outlined"
                fullWidth
              />
            }
          />

          <FormControl fullWidth variant="outlined" error={!!errors.type}>
            <InputLabel id="type-label">Type</InputLabel>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              rules={{ required: "Type is required" }}
              render={({ field }) =>
                <Select
                  {...field}
                  labelId="type-label"
                sx={{ my: 1 }}
                  
                  id="type"
                  label="Type"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value={"push"}>Push</MenuItem>
                  <MenuItem value={"pull"}>Pull</MenuItem>
                  <MenuItem value={"legs"}>Legs</MenuItem>
                  <MenuItem value={"cardio"}>Cardio</MenuItem>
                </Select>
              }
            />
            {errors.type && <p className="error-message">{errors.type.message}</p>}
          </FormControl>

          <Controller
            control={control}
            name="file"
            defaultValue={initialValues?.file || null}
            render={({ field }) => (
              <Box>
                <Button variant="outlined" component="label" color="primary" sx={{ mt: 1, mb: 2,  }}>
                  Upload Image
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
                {fileName && <Typography variant="subtitle1">Chosen file: {fileName}</Typography>}
              </Box>
            )}
          />

                          

          <Button type="submit" fullWidth sx={{ mt: 2 }} variant="contained" color="primary">
            {updating ? "Update" : buttonText}
          </Button>
        </form>
      {/* </div> */}

    </Card>
     </Box>
  );
}

export default WorkoutForm;
