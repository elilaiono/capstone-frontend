import React, { useContext } from 'react';
import { Card, CardActions, CardContent, Collapse, Grid, IconButton, Typography, CardMedia } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import UserContext from '../contexts/UserContext'; 

const ProgressPictureCard = () => {
  const { progressPictureData } = useContext(UserContext);
  const [expandedId, setExpandedId] = React.useState(null);

  return (
    <Grid container spacing={4}>
      {progressPictureData.map((picture) => (
        <Grid item key={picture.id} xs={12} sm={6} md={4}>
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
            <CardMedia
              component="img"
              height="140"
              loading='lazy'
              image={picture.imgUrl}
              alt="progress picture"
            />
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {new Date(Date.parse(picture.picDate)).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions sx={{ 
              display: 'flex', 
              justifyContent: 'center' 
            }}>
              <IconButton
                onClick={() => setExpandedId(picture.id === expandedId ? null : picture.id)}
                sx={{ 
                  transform: picture.id === expandedId ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.3s',
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={picture.id === expandedId}>
              <CardContent>
                <Typography variant="body2">
                  <span style={{fontWeight: "bold"}}>Notes:</span> {picture.notes}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProgressPictureCard;
