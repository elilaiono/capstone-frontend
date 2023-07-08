import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link as RouterLink } from "react-router-dom";
import { TextField, Button, Card, Typography, Box, Link } from "@mui/material";
import { useForm } from 'react-hook-form';

import '../styles/form.css';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({email, password}) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      console.log(email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#FAF9F6" }}>
    <Box className="login-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* <Card sx={{ p: 4, maxWidth: 400, mx: 'auto' }}> */}
      <Card className="form-card">
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 3 }}>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
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
            Sign In
          </Button>
        </form>

        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Not registered? <Link component={RouterLink} to="/signup">Create an account</Link>
        </Typography>
      </Card>
    </Box>
    </div>
  );
};

export default Login;


