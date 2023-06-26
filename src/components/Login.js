import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

import './styles/login.css';

const Auth = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // const signUp = async () => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     setShowSuccessModal(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setIsLoggedIn(true);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  // const logOut = async () => {
  //   try {
  //     await signOut(auth);
  //     setIsLoggedIn(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  return (
    <div className="login-container">
        <div className="card">    
      {isLoggedIn && showSuccessModal && (
        <div className="modal">
          <div className="success-message">
            Logged in successfully!
            <button onClick={closeSuccessModal}>Close</button>
          </div>
        </div>
      )}      
        <input
          placeholder="Email..."
          type="email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        <input
          placeholder="Password..."
          type="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button onClick={signIn}>Sign In</button>
        {/* <button onClick={logOut}>Log Out</button> */}
        <p>
      Not registered?{" "}
      <Link to="/signup">Create an account</Link>
    </p>
      </div>
      </div>
    
  );
};

export default Auth;

