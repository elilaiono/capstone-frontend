import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

import "./styles/signup.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const signUp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/users/add", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      // Handle the response or show success message as needed
      console.log(response.data);
      console.log(email)

      // await signInWithEmailAndPassword(auth, email, password);
      // console.log("User logged in successfully");

      setShowSuccessModal(true);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
      console.error(error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="card">
        {showSuccessModal && (
          <div className="modal">
            <div className="success-message">
              Registered successfully! Please login in!
              <button onClick={closeSuccessModal}>Close</button>
            </div>
          </div>
        )}

        <input
          type="text"
          value={firstName}
          placeholder="First Name..."
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name..."
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;




