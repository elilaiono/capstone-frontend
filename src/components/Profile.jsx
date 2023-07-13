import React, { useContext } from "react";
import { Avatar, Box, Typography, Card, CardContent } from "@mui/material";
import UserContext from "../contexts/UserContext";

const Profile = () => {
  const { userData } = useContext(UserContext);

   const renderAvatar = () => {
    if (userData?.profilePicture) {
      return <Avatar src={userData.profilePicture} alt="Profile Picture" />;
    } else {
      // Use a placeholder avatar image or a default image
      return <Avatar sx={{ mx: 20, width: 56, height: 56}} alt="Profile Picture">E</Avatar>;
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mt: 3, mx: 50, backgroundColor: "'#FAF9F6'" }}>
      <CardContent>
        <Box  textAlign="center">
          {userData ? (
            <>
              {renderAvatar()}
              <Typography sx={{ mt: 2, }} variant="h4" gutterBottom>
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {userData.email}
              </Typography>
              <Typography variant="h6">
                Bio/About Me:
              </Typography>
              <Typography variant="body1" gutterBottom>
                I'm a gym enthusiast who's always looking to improve. I love to spend time with my wife,
                play video games and the guitar, and I love to lift heavy weights!
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                Welcome!
              </Typography>
              <Typography variant="body1">
                Please log in to view your profile.
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Profile;
