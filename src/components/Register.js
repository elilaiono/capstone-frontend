import { useState } from "react";
import { auth } from '../config/firebase';
import { Link } from "react-router-dom";

const Register = ({ closeSuccessModal }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        userId: auth?.currentUser?.uid
      };

      let res = await fetch("http://localhost:8080/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.status === 200) {
        setFirstName("");
        setLastName("");
        setPassword("");
        setEmail("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
        <div className="card">    
      {showSuccessModal && (
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>Sign In</button>
      </div>
    </div>
    
  
  );
};

export default Register;

