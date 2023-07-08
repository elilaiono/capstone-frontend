
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { TextField, Button, Card, Typography, Box, Dialog, DialogContent, DialogTitle } from "@mui/material";

import "../styles/form.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    try {
      const response = await axios.post("http://localhost:8080/users/add", {
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
    <div style={{ backgroundColor: "#FAF9F6" }}>
    <Box className="signup-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* <Card sx={{ p: 4, maxWidth: 400, mx: 'auto' }}> */}
      <Card className="form-card">
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 3 }}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("firstName", { required: true })}
            placeholder="First Name..."
            error={errors.firstName}
            helperText={errors.firstName && "First Name is required"}
            sx={{ mb: 2 }}
            fullWidth
          />

          <TextField
            {...register("lastName", { required: true })}
            placeholder="Last Name..."
            error={errors.lastName}
            helperText={errors.lastName && "Last Name is required"}
            sx={{ mb: 2 }}
            fullWidth
          />

          <TextField
            {...register("email", { required: true })}
            placeholder="Email..."
            type="email"
            error={errors.email}
            helperText={errors.email && "Email is required"}
            sx={{ mb: 2 }}
            fullWidth
          />

          <TextField
            {...register("password", { required: true })}
            placeholder="Password..."
            type="password"
            error={errors.password}
            helperText={errors.password && "Password is required"}
            sx={{ mb: 2 }}
            fullWidth
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign Up
          </Button>
        </form>
      </Card>

      <Dialog open={showSuccessModal} onClose={closeSuccessModal}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          Registered successfully! Please login in!
          <Button variant="contained" color="primary" onClick={closeSuccessModal} fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
    </div>
  );
};

export default SignUp;



