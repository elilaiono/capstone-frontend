import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

import './styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate('/');
      console.log(loginEmail);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="card">
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

        <p>
          Not registered? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
