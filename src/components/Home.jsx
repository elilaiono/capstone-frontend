import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import '../styles/home.css';
import TestLandingPage from './LandingPage'

const Home = () => {
  const userData = useContext(UserContext)

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
    <div className='home-container'>
      {/* {userData ? <h1>Welcome, {userData.firstName}!</h1> : <p>Sign up to see your profile!</p>} */}
      <TestLandingPage />
    </div>
    </div>
  );
};

export default Home;
