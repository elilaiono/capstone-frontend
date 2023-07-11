import React, { useContext } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import UserContext from '../contexts/UserContext'; 

const WeightTrackerCard = () => {
  const { weightData } = useContext(UserContext);

  return (
    <Grid container spacing={4}>
      {weightData.map((weightEntry) => (
        <Grid item key={weightEntry.id} xs={12} sm={6} md={4}>
          <Card sx={{ 
            minWidth: 275, 
            mx: 'auto', 
            my: 2, 
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {weightEntry.weight} lbs
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {new Date(Date.parse(weightEntry.weightDate)).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

    </Grid>
  );
}

export default WeightTrackerCard;
