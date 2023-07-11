// import React, { useState, useContext } from 'react';
// import UserContext from '../contexts/UserContext';
// import { Link, useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from '../config/firebase';
// // import UserData from './useUserData'

// import icons from '../constants/icons';
// import "../styles/nav.css"

// const Nav = () => {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userLoginData, setUserLoginData] = useState(null);

//   // const { userData } = UserData();
//   const userData = useContext(UserContext)
//   const navigate = useNavigate();


//   let loggedInUserData = userData;

//   // check in local storage
//   if(!loggedInUserData) {
//     loggedInUserData = JSON.parse(localStorage.getItem('userData'));
//   }

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log("User logged out successfully");
//       // Clear user data from local storage
//       // localStorage.removeItem('userData');
//       setUserLoginData(null);
//       navigate('/');
//       window.location.reload();

//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div className="header">
//       <div className="logo">
//         {/* <img src={icons.barbell} alt="barbell icon" className="logo-image" /> */}
//         <span className="logo-name">Apex Lifter</span>
//       </div>
//       <div className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//       <nav className={`nav ${isMobileMenuOpen ? 'mobile' : ''}`}>
//         <ul className="nav-links">
//           <li>
//             <Link to="/" className="link" onClick={() => setMobileMenuOpen(false)}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/workouts" className="link" onClick={() => setMobileMenuOpen(false)}>
//               Workouts
//             </Link>
//           </li>
//           <li>
//             <Link to="/progress" className="link" onClick={() => setMobileMenuOpen(false)}>
//               Progress
//             </Link>
//           </li>
//           <li>
//             <Link to="/profile" className="link" onClick={() => setMobileMenuOpen(false)}>
//               Profile
//             </Link>
//           </li>
//           <li>
//             {/* {console.log("This is the user data:", userData)} */}
//             { userData ? (
//               <Link to="/" className="link" onClick={handleLogout}>
//                 Logout
//               </Link>
//             ) : (
//               <Link to="/login" className="link" onClick={() => setMobileMenuOpen(false)}>
//                 Login
//               </Link>
//             )}
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Nav;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem,
Button, ListItemText, useMediaQuery, useTheme, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserContext from '../contexts/UserContext';

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
      // console.log(auth.currentUser)
      await signOut(auth);
      // localStorage.removeItem('userData');
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Apex Lifter
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
