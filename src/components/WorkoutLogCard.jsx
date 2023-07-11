import React, { useContext } from 'react';
import { Card, CardActions, CardContent, Collapse, Grid, IconButton, Typography, Button } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import UserContext from '../contexts/UserContext'; 

const WorkoutLogCard = ({ handleEditClick }) => {
  const { workoutLogData } = useContext(UserContext);
  const [expandedId, setExpandedId] = React.useState(null);

  return (
    <Grid container spacing={4}>
      {workoutLogData.map((workoutLog) => (
        <Grid item key={workoutLog.id} xs={12} sm={6} md={4}>
          <Card sx={{ 
            minWidth: 275, 
            mx: 'auto', 
            my: 2, 
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'white'
          }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {workoutLog.workout}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Workout Date: {new Date(Date.parse(workoutLog.workoutDate)).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions sx={{ 
              display: 'flex', 
              justifyContent: 'center' 
            }}>
              <IconButton
                onClick={() => setExpandedId(workoutLog.id === expandedId ? null : workoutLog.id)}
                sx={{ 
                  transform: workoutLog.id === expandedId ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.3s',
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={workoutLog.id === expandedId}>
              <CardContent>
                <Typography variant="body2">
                  <span style={{fontWeight: "bold"}}>Notes:</span> {workoutLog.notes}
                </Typography>
              </CardContent>
              <CardActions sx={{ 
                display: 'flex', 
                justifyContent: 'center' 
              }}>
                <Button size="small" onClick={() => handleEditClick(workoutLog)}>Edit</Button>
              </CardActions>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default WorkoutLogCard;
