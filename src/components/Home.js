import UserData from './UserData';

const Home = () => {
  const { userData } = UserData();

  if (!userData) {
    return <p>Sign up to see your profile!</p>;
  }

  return (
    <div>
      <h1>Welcome, {userData.firstName}! </h1>
    </div>
  );
};

export default Home;

