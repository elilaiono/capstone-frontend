import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import './styles/signup.css';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="signup-container">
      <div className="card">
        {showSuccessModal && (
          <div className="modal">
            <div className="success-message">
              Registered successfully!
              <button onClick={closeSuccessModal}>Close</button>
            </div>
          </div>
        )}

        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;
