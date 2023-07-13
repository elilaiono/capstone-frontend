
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Card, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";

const UploadProgressPicForm = ({ initialValues, onSubmit }) => {
  const { handleSubmit, formState: { errors }, control, reset } = useForm();
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };


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
    setShowSuccessModal(true)
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
      <Dialog open={showSuccessModal} onClose={handleSuccessModalClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          Your Picture was successfully uploaded!
          <Button variant="contained" color="primary" onClick={handleSuccessModalClose} fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UploadProgressPicForm;

