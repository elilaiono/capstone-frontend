import { useState } from 'react';
import { Link } from 'react-router-dom';
import icons from '../constants/icons';
import './styles/nav.css';

const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link to="/" className="link" onClick={toggleMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/workouts" className="link" onClick={toggleMobileMenu}>
              Workouts
            </Link>
          </li>
          <li>
            <Link to="/progress" className="link" onClick={toggleMobileMenu}>
              Progress
            </Link>
          </li>
          <li>
            <Link to="/profile" className="link" onClick={toggleMobileMenu}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/login" className="link" onClick={toggleMobileMenu}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
