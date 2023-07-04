// import { useContext } from 'react';
import UserData from './useUserData';
import '../styles/home.css'

const Home = () => {
  const { userData } = UserData();
  // const { userData } = useContext(UserContext)
  // console.log(userData)

  if (!userData) {
    return <p>Sign up to see your profile!</p>;
  }

  return (
    <div className='home-container'>
      <h1>Welcome, {userData.firstName}! </h1>
    </div>
  );
};

export default Home;

