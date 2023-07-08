import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography,
Card, Checkbox, FormControlLabel } from "@mui/material";

function GoalForm({ initialValues, onSubmit, buttonText, updating }) {
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
          Create Your Goal
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
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) =>
              <TextField
                {...field}
                id="description"
                label="Description"
                sx={{ my: 1}}
                variant="outlined"
                fullWidth
              />
            }
          />

          <Controller
            name="startDate"
            control={control}
            defaultValue=""
            rules={{ required: "Start date is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="startDate"
                label="Start Date"
                sx={{ my: 1 }}
                type="date"
                variant="outlined"
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="targetDate"
            control={control}
            defaultValue=""
            rules={{ required: "Target date is required" }}
            render={({ field }) =>
              <TextField
                {...field}
                id="targetDate"
                label="Target Date"
                sx={{ my: 1 }}
                type="date"
                variant="outlined"
                error={!!errors.targetDate}
                helperText={errors.targetDate?.message}
                fullWidth
              />
            }
          />

          <Controller
            name="progress"
            control={control}
            defaultValue=""
            render={({ field }) =>
              <TextField
                {...field}
                id="progress"
                label="Progress"
                sx={{ my: 1 }}
                variant="outlined"
                fullWidth
              />
            }
          />

          <Controller
            name="completed"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel 
                control={<Checkbox {...field} color="primary" checked={field.value} />}
                label="Completed"
                sx={{ my: 1 }}
              />
            )}
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

          <Button type="su bmit" variant="contained" color="primary">
            Create
          </Button>
        </form>

      </Card>
     </Box>
  );
}

export default GoalForm;
