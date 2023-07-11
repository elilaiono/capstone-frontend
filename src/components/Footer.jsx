import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'© '}
      <Link color="inherit" href="https://mui.com/">
        Apex Lifter
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 18, mb: 2 }} maxWidth="sm">
          <Typography variant="h4" component="h1" gutterBottom>
            Apex Lifter
          </Typography>
          <Typography variant="subtitle1" component="h2" gutterBottom>
            Your Ultimate Fitness Companion
          </Typography>
          <Typography variant="body2">
            Track your fitness journey, set goals, and make progress with Apex Lifter.
          </Typography>
        </Container>

        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" gutterBottom>About Us</Typography>
                <Typography variant="body2">We are a group of fitness enthusiasts dedicated to building a platform that supports your fitness journey.</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" gutterBottom>Contact Us</Typography>
                <Typography variant="body2">
                  Email: info@apexlifter.com<br />
                  Phone: 123-456-7890
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" gutterBottom>Helpful Links</Typography>
                <Link color="inherit" href="/terms">Terms of Service</Link><br />
                <Link color="inherit" href="/privacy">Privacy Policy</Link>
              </Grid>
            </Grid>
          </Container>
          <Box sx={{ mt: 2 }} textAlign="center">
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
