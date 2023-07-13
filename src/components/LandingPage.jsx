import React, { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { Container, Grid, Typography, Button, Box, Card,
CardContent, CardMedia, CardActions, createTheme, Collapse, IconButton, ThemeProvider } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link as RouterLink } from "react-router-dom"

import icons from '../constants/icons'

const theme = createTheme({
  spacing: 4,
});

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

const LandingPage = () => {
  const { userData } = useContext(UserContext);
  const [expandedId, setExpandedId] = useState(null);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleButtonClick = () => {
    window.scrollTo(0, 0);
  }

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
                {!userData && (
                  <Button variant="contained" color="primary" component={RouterLink} to="/login">
                    Get Started
                  </Button>
                )}
              </Box>
            </Container>
          </HeroContent>

          {/* Features Section */}
          <CardGrid maxWidth="md">
            <Grid container spacing={4}>
              
              {/* Workout Card */}
              <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                  <CardMediaStyled
                    image={icons.landingPageImg}
                    title="Workout"
                  />
                  <CardContentStyled>
                    <Typography gutterBottom variant="h5" component="h2">
                      Workouts
                    </Typography>
                    <Typography>
                      This feature allows you to browse from a selection of the popular Push, Pull, Legs workout split.
                    </Typography>
                  </CardContentStyled>
                  <CardActions sx={{ 
                    display: 'flex', 
                    justifyContent: 'center' 
                  }}>
                    <IconButton
                      onClick={() => handleExpandClick(1)}
                      sx={{ 
                        transform: expandedId === 1 ? 'rotate(180deg)' : 'none', 
                        transition: 'transform 0.3s',
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expandedId === 1}>
                    <CardContent>
                      <Typography variant="body2">
                        Add for favorite workouts all in one place! Sign in to create your own custom workouts!
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ 
                      display: 'flex', 
                      justifyContent: 'center' 
                    }}>
                      <Button size="small" component={RouterLink} to="/workouts" onClick={handleButtonClick}>
                        Workouts
                      </Button>
                    </CardActions>
                  </Collapse>
                </StyledCard>
              </Grid>

              {/* Goal Card */}
              <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                  <CardMediaStyled
                    image={icons.goalImg}
                    title="Goal"
                  />
                  <CardContentStyled>
                    <Typography gutterBottom variant="h5" component="h2">
                      Goals
                    </Typography>
                    <Typography>
                      Set and track your fitness goals with this feature.
                    </Typography>
                  </CardContentStyled>
                  <CardActions sx={{ 
                    display: 'flex', 
                    justifyContent: 'center' 
                  }}>
                    <IconButton
                      onClick={() => handleExpandClick(2)}
                      sx={{ 
                        transform: expandedId === 2 ? 'rotate(180deg)' : 'none', 
                        transition: 'transform 0.3s',
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expandedId === 2}>
                    <CardContent>
                      <Typography variant="body2">
                        A goal is only a wish unless it's written down! Sign in and start your fitness journey
                        setting goals!
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ 
                      display: 'flex', 
                      justifyContent: 'center' 
                    }}>
                      <Button size="small" component={RouterLink} to="/progress" onClick={handleButtonClick}>
                        Progress
                      </Button>
                    </CardActions>
                  </Collapse>
                </StyledCard>
              </Grid>

              {/* Workout Log Card */}
              <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                  <CardMediaStyled
                    image={icons.wkLogImg}
                    title="Workout Log"
                  />
                  <CardContentStyled>
                    <Typography gutterBottom variant="h5" component="h2">
                      Workout Log
                    </Typography>
                    <Typography>
                      Keep track of your workout history and progress.
                    </Typography>
                  </CardContentStyled>
                  <CardActions sx={{ 
                    display: 'flex', 
                    justifyContent: 'center' 
                  }}>
                    <IconButton
                      onClick={() => handleExpandClick(3)}
                      sx={{ 
                        transform: expandedId === 3 ? 'rotate(180deg)' : 'none', 
                        transition: 'transform 0.3s',
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expandedId === 3}>
                    <CardContent>
                      <Typography variant="body2">
                        Logging your workouts will help you better track progress and see how you're
                        structuring your workouts. This will help you better understand your body and
                        your capabilities
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ 
                      display: 'flex', 
                      justifyContent: 'center' 
                    }}>
                      <Button size="small" component={RouterLink} to="/progress" onClick={handleButtonClick}>
                        Progress
                      </Button>
                    </CardActions>
                  </Collapse>
                </StyledCard>
              </Grid>
            </Grid>
          </CardGrid>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default LandingPage;
