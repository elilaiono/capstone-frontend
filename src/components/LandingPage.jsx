import React, { useContext } from 'react';
import { Container, Grid, AppBar, Toolbar, Typography, Button, Box, Card,
CardContent, CardMedia, createTheme, ThemeProvider } from '@mui/material';
import { styled } from '@mui/system';
import UserContext from '../contexts/UserContext';

import { Link as RouterLink } from "react-router-dom"

const theme = createTheme({
    spacing: 4,
})

const HeroContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
}));

const CardGrid = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const CardMediaStyled = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9
});

const CardContentStyled = styled(CardContent)({
  flexGrow: 1,
});

const features = [
  { title: "Feature 1", description: "Description of feature 1", image: "image_url_1" },
  { title: "Feature 2", description: "Description of feature 2", image: "image_url_2" },
  { title: "Feature 3", description: "Description of feature 3", image: "image_url_3" },
]

const LandingPage = () => {

  const userData = useContext(UserContext)


  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>

        <main>
          {/* Hero Section */}
          <HeroContent mt={10}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
               {userData ? `Welcome, ${userData.firstName} to Apex Lifters` : "Welcome to Apex Lifters"}
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                A better way to manage your fitness journey.
              </Typography>
              <Box mt={4} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" component={RouterLink} to="/login">
                  Get Started
                </Button>
              </Box>
            </Container>
          </HeroContent>

          {/* Features Section */}
          <CardGrid maxWidth="md">
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <StyledCard>
                    <CardMediaStyled
                      image={feature.image}
                      title={feature.title}
                    />
                    <CardContentStyled>
                      <Typography gutterBottom variant="h5" component="h2">
                        {feature.title}
                      </Typography>
                      <Typography>
                        {feature.description}
                      </Typography>
                    </CardContentStyled>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </CardGrid>

        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default LandingPage;
