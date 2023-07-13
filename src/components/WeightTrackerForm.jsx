import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Card, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";

const WeightTrackerForm = ({ initialValues, onSubmit, buttonText, updating }) => {
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
                InputLabelProps={{shrink: true}}
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
          Your Weight was successfully recorded!
          <Button variant="contained" color="primary" onClick={handleSuccessModalClose} fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default WeightTrackerForm;
