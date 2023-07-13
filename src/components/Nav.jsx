import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem,
Button, ListItemText, useMediaQuery, useTheme, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserContext from '../contexts/UserContext';

import icons from '../constants/icons'

const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  let loggedInUserData = userData;
  if (!loggedInUserData) {
    loggedInUserData = JSON.parse(localStorage.getItem('userData'));
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log(auth.currentUser)
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Workouts', link: '/workouts' },
    { text: 'Progress', link: '/progress' },
    { text: 'Profile', link: '/profile' },
    userData ? { text: 'Logout', link: '/', onClick: handleLogout } : { text: 'Login', link: '/login' }
  ];

  return (
    <AppBar position="static">
      <Toolbar>
      <img src={icons.logo} alt="Logo" width={30} height={30} style={{ margin: '0 10px' }}  /> 
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Apex Lifters
        </Typography>
        {!isMobile && menuItems.map((item, index) => (
          <Button key={index} color="inherit" component={Link} to={item.link} onClick={item.onClick}>{item.text}</Button>
        ))}
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleMobileMenu} sx={{ mr: 2 }}>
          {isMobile && <MenuIcon />}
        </IconButton>
      </Toolbar>
      {isMobile && (
        <Drawer anchor="right" open={isMobileMenuOpen} onClose={toggleMobileMenu}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} component={Link} to={item.link} onClick={item.onClick ? item.onClick : toggleMobileMenu}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </AppBar>
  );
};

export default Nav;
