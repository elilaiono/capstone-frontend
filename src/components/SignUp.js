import { useState } from "react";
import axios from "axios";

import "./styles/signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const signUp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/users/add", {
        email: email,
        password: password,
      });

      // Handle the response or show success message as needed
      console.log(response.data);

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




