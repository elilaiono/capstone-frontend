import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Card, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";

const PersonalRecordForm = ({ initialValues, onSubmit }) => {
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

  const onSubmitForm = (data) => {
    onSubmit(data);
    reset();
    setShowSuccessModal(true)
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
      <Dialog open={showSuccessModal} onClose={handleSuccessModalClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          Your Personal Record successfully recorded!
          <Button variant="contained" color="primary" onClick={handleSuccessModalClose} fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PersonalRecordForm;

