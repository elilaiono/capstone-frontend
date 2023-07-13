import React, { useContext } from 'react';
import { Card, CardActions, CardContent, Collapse, Grid, IconButton, Typography, Button } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import UserContext from '../contexts/UserContext'; 

const PersonalRecordCard = ({ handleEditClick }) => {
  const { personalRecordData } = useContext(UserContext);
  const [expandedId, setExpandedId] = React.useState(null);

  const convertDate = (record) => {
    const timestamp = record.recordDate;
    const date = new Date(timestamp._seconds * 1000)
    const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    return formattedDate;
 }

  return (
    <div >
    <Grid container spacing={4}>
      {personalRecordData.map((record) => (
        <Grid item key={record.id} xs={12} sm={6} md={4}>
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
              <Typography sx={{ fontSize: 18, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                {record.title}
              </Typography>
              <Typography variant="h5" component="div">
                New Record: {record.newRecord}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Previous Record: {record.previousRecord}
              </Typography>
            </CardContent>
            <CardActions sx={{ 
              display: 'flex', 
              justifyContent: 'center' 
            }}>
              <IconButton
                onClick={() => setExpandedId(record.id === expandedId ? null : record.id)}
                sx={{ 
                  transform: record.id === expandedId ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.3s',
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={record.id === expandedId}>
              <CardContent>
                <Typography variant="body2">
                  <span style={{fontWeight: "bold"}}>Record Date:</span> {convertDate(record)}
                  <br/>
                  <span style={{fontWeight: "bold"}}>Notes:</span> {record.notes}
                </Typography>
              </CardContent>
              <CardActions sx={{ 
                display: 'flex', 
                justifyContent: 'center' 
              }}>
                <Button size="small" onClick={() => handleEditClick(record)}>Edit</Button>
              </CardActions>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
}

export default PersonalRecordCard;
