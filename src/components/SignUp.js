import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSuccess(); // Call the onSuccess callback function from the parent component
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup">
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
  );
};

export default SignUp;
