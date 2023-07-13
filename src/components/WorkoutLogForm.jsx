import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Card, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";

const WorkoutLogForm = ({ initialValues, onSubmit, buttonText, updating }) => {
  const { handleSubmit, formState: { errors }, control, reset } = useForm();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    window.location.reload();
    window.scrollTo(0, 0);
  };

  // reset form values when initialValues change
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const onSubmitForm = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
    reset();
    setShowSuccessModal(true)
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
                InputLabelProps={{shrink: true}}
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
      <Dialog open={showSuccessModal} onClose={handleSuccessModalClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          Your Workout was successfully logged!
          <Button variant="contained" color="primary" onClick={handleSuccessModalClose} fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default WorkoutLogForm;
