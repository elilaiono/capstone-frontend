import React, { useContext } from 'react';
import { Card, CardActions, CardContent, Collapse, Grid, IconButton, Typography, Button } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import UserContext from '../contexts/UserContext'; 

const GoalCard = ({ handleEditClick }) => {
  const { goalData } = useContext(UserContext);
  const [expandedId, setExpandedId] = React.useState(null);

  const convertStartDate = (goal) => {
     const timestamp = goal.startDate;
     const date = new Date(timestamp._seconds * 1000)
     const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
     return formattedDate;
  }

  const convertTargetDate = (goal) => {
     const timestamp = goal.targetDate;
     const date = new Date(timestamp._seconds * 1000)
     const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
     return formattedDate;
  }

  return (
    <Grid container spacing={4}>
      {goalData.map((goal) => (
        <Grid item key={goal.id} xs={12} sm={6} md={4}>
          <Card sx={{ 
            minWidth: 275, 
            mx: 'auto', 
            my: 2, 
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: "white",

          }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Goal Status: {goal.completed ? 'Completed' : 'In Progress'}
              </Typography>
              <Typography variant="h5" component="div">
                {goal.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Target Date: {convertTargetDate(goal)}
              </Typography>
            </CardContent>
            <CardActions sx={{ 
              display: 'flex', 
              justifyContent: 'center' 
            }}>
              <IconButton
                onClick={() => setExpandedId(goal.id === expandedId ? null : goal.id)}
                sx={{ 
                  transform: goal.id === expandedId ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.3s',
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={goal.id === expandedId}>
              <CardContent>
              <Typography variant="body2">
                
              <span style={{fontWeight: "bold"}}>Start Date:</span> {convertStartDate(goal)}
              {/* {startDate(goal)}; */}
              <br/>
              <span style={{fontWeight: "bold"}}>Notes:</span> {goal.notes}
              </Typography>
              </CardContent>
              <CardActions sx={{ 
                display: 'flex', 
                justifyContent: 'center' 
              }}>
                <Button size="small" onClick={() => handleEditClick(goal)}>Edit</Button>
              </CardActions>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default GoalCard;
