import { useState, useContext } from 'react';
import { UserContext } from './useUserData';
import { Link } from 'react-router-dom';
import UserData from './useUserData'

import icons from '../constants/icons';
import './styles/nav.css';

const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // const { userData, handleLogout } = useContext(UserContext);
  const { userData, handleLogout } = UserData();

  let loggedInUserData = userData;

  // check in local storage
  if(!loggedInUserData) {
    loggedInUserData = JSON.parse(localStorage.getItem('userData'));
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={icons.barbell} alt="barbell icon" className="logo-image" />
        <span className="logo-name">Apex Lifter</span>
      </div>
      <div className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`nav ${isMobileMenuOpen ? 'mobile' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" className="link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/workouts" className="link" onClick={() => setMobileMenuOpen(false)}>
              Workouts
            </Link>
          </li>
          <li>
            <Link to="/progress" className="link" onClick={() => setMobileMenuOpen(false)}>
              Progress
            </Link>
          </li>
          <li>
            <Link to="/profile" className="link" onClick={() => setMobileMenuOpen(false)}>
              Profile
            </Link>
          </li>
          <li>
            {console.log("This is the user data:", userData)}
            { userData ? (
              <Link to="/" className="link" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/login" className="link" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
