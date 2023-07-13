import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Card, Typography, Box, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      console.log(email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#F8F8F8" }}>
      <Box className="login-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card className="form-card"> {/* Add the "form-card" class */}
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 3 }}>
            Login
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="email"
                  label="Email"
                  sx={{ mb: 2 }}
                  type="email"
                  variant="outlined"
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
                  id="password"
                  type="password"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password && "Password is required"}
                  sx={{ mb: 2 }}
                  fullWidth
                />
              )}
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
