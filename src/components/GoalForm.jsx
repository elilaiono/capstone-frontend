import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography,
Card, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent } from "@mui/material";

function GoalForm({ initialValues, onSubmit }) {
  const { handleSubmit, formState: { errors }, control, reset } = useForm();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };
  
  // reset form values when initialValues change
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const onSubmitForm = (data) => {
    onSubmit(data);
    reset();
    setShowSuccessModal(true);
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
            defaultValue={Date.now()}
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
                InputLabelProps={{shrink: true}}
                
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
                InputLabelProps={{shrink: true}}
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

          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </Card>
      <Dialog open={showSuccessModal} onClose={handleSuccessModalClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          Your Goal was successfully created!
          <Button variant="contained" color="primary" onClick={handleSuccessModalClose} fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
     </Box>
  );
}

export default GoalForm;
