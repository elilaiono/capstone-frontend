
import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import WorkoutData from './useWorkoutData';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { auth } from "../config/firebase";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../styles/test.css'

const defaultTheme = createTheme();

export default function Album({ selectedWorkout, setSelectedWorkout, handleClick }) {
  const userData = useContext(UserContext)
  const { 
    workoutData,
    pushWorkouts,
    pullWorkouts,
    legWorkouts,
    cardioWorkouts
  } = WorkoutData();

  const [filterType, setFilterType] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  
  const combinedData = [
    ...pushWorkouts, 
    ...workoutData,
    ...pullWorkouts,
    ...legWorkouts,
    ...cardioWorkouts
  ];

  const filteredData = filterType === "yourWorkouts" ? workoutData : combinedData.filter(workout => {
    if (filterType === "") {
      return true; // No filter applied, include all workouts
    } else {
      return workout.type === filterType; // Filter by workout type
    }
  });

  const baseUrl = process.env.REACT_APP_BASE_URL

  const deleteWorkout = async (workoutId) => {
    const apiUrl = `${baseUrl}/users/workouts/${auth.currentUser.uid}/${workoutId}`;
  
    let res = await fetch(apiUrl, {
      method: "DELETE",
    });
  
    if (res.status === 200) {
      console.log(`Workout deleted successfully`);
      window.location.reload(); // Reloading the page
    } else {
      console.log(`An error occurred while deleting the workout`);
    }
  };
  

  return (
    <div style={{ backgroundColor: "#FAF9F6" }}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: '#FAF9F6',
            pt: 8,
            pb: 6,
          }}
        >
          <Container
          sx={{ bgcolor: '#FAF9F6' }} 
          maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Workouts
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Browse from a vast collection of hand-picked workouts to 
              build the body of your dreams! Sign in to enter your own custom workouts!
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="filter-select-label">Workout Type</InputLabel>
              <Select
                labelId="filter-select-label"
                id="filter-select"
                value={filterType}
                label="Workout Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="">
                  <em>All Types</em>
                </MenuItem>
                <MenuItem value={"push"}>Push</MenuItem>
                <MenuItem value={"pull"}>Pull</MenuItem>
                <MenuItem value={"legs"}>Legs</MenuItem>
                <MenuItem value={"cardio"}>Cardio</MenuItem>
                {userData && <MenuItem value={"yourWorkouts"}>Your Workouts</MenuItem>}
              </Select>
            </FormControl>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              { userData ? <Button onClick={handleClick} variant="contained">Create Workout</Button> : null }
            </Stack>
          </Container>
        </Box>
       
        <Container sx={{ py: 8, bgcolor: "#FAF9F6" }} maxWidth="md">
  <Grid container spacing={4}>
    {filteredData.map((workout) => (
      <Grid item key={workout.id} xs={12} sm={6} md={4}>
        <Card 
          sx={{ 
            height: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            "&:hover": {
              transform: 'none',  // Change this to 'none' or another value to control the hover effect
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: 140 }}  // You might need to adjust this
            image={workout.imgUrl ? workout.imgUrl : 'https://loremflickr.com/320/240'} loading='lazy'
            alt={workout.exerciseName}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {workout.exerciseName}
            </Typography>
            <Typography>
              {workout.description}
            </Typography>
            <Collapse in={workout.id === expandedId}>
              <Typography>
                Duration: {workout.duration}
              </Typography>
              <Typography>
                Difficulty Level: {workout.difficultyLevel}
              </Typography>
              <Typography>
                Additional Notes: {workout.additionalNotes}
              </Typography>
              { workoutData.find(w => w.id === workout.id) && 
                <CardActions>
                  <div className="actions">
                    <div className="button-container">
                      <Button size="small" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWorkout(workout);
                      }}>Edit</Button>
                    
                      <Button size="small" onClick={(e) => {
                        e.stopPropagation();
                        deleteWorkout(workout.id);
                      }}>Delete</Button>
                    </div>
                  </div>
                </CardActions>
              }
            </Collapse>
          </CardContent>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              setExpandedId(workout.id === expandedId ? null : workout.id);
            }}
            sx={{ 
              transform: workout.id === expandedId ? 'rotate(180deg)' : 'none', 
              transition: 'transform 0.3s',
              "&:hover": {
                transform: 'none',
              },
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>

      </main>
    </ThemeProvider>
    </div>
  );
}
