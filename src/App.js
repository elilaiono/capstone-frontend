import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDataProvider from './components/UserDataProvider';
import WorkoutDataProvider from './components/WorkoutDataProvider';

import Nav from './components/Nav';
import Home from './components/Home';
import Workouts from './components/Workouts';
import Progress from './components/Progress';
import Profile from './components/Profile';
import Login from './components/Login'
import Footer from './components/Footer';
import SignUp from './components/SignUp';

const App = () => {

  return (
    <div style={{ backgroundColor: '#F8F8F8'}}>
      <UserDataProvider>
        <WorkoutDataProvider>
          <Nav />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="workouts" element={<Workouts />} />
              <Route exact path="progress" element={<Progress />} />
              <Route exact path="profile" element={<Profile />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="signup" element={<SignUp  />} />
            </Routes>

          <Footer />
        </WorkoutDataProvider>
      </UserDataProvider>
    </div>
  );
}

export default App;
