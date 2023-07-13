import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Card, Typography, Box, Dialog, DialogContent, DialogTitle, Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'
import axios from "axios";

const SignUp = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    try {
      const response = await axios.post(`${baseUrl}/users/add`, {
        firstName,
        lastName,
        email,
        password,
      });

      // Handle the response or show success message as needed
      console.log(response.data);
      console.log(email)

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: "#F8F8F8" }}>
      <Box className="login-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card className="form-card" sx={{ maxWidth: 610 }}>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 3 }}>
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  sx={{ mb: 2 }}
                  error={!!errors.firstName}
                  helperText={errors.firstName && "First Name is required"}
                  fullWidth
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  sx={{ mb: 2 }}
                  error={!!errors.lastName}
                  helperText={errors.lastName && "Last Name is required"}
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  sx={{ mb: 2 }}
                  error={!!errors.email}
                  helperText={errors.email && "Email is required"}
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  sx={{ mb: 2 }}
                  error={!!errors.password}
                  helperText={errors.password && "Password is required"}
                  fullWidth
                />
              )}
            />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign Up
            </Button>
          </form>

          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Already have an account? <Link component={RouterLink} to="/login">Sign In</Link>
          </Typography>
        </Card>
      </Box>

      <Dialog open={showSuccessModal} onClose={closeSuccessModal}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          Registered successfully! Please login in!
          <Button variant="contained" color="primary" onClick={closeSuccessModal} fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUp;

