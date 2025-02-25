import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./page.module.css";


const Page: React.FC = () => {
  const navigate = useNavigate();

  // State für Username und Passwort
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter username and password!");
    } else {
      console.log("Navigating to /dashboard");
      navigate("/dashboard");
    }
  };

  const handleRegister = () => {
    console.log("Navigating to /register");
    navigate("/register");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
      <img src="src/png/Logo.jpg" alt="Pharmacy Logo" className={styles.logo} />
        <h1>Pharmacy Management System</h1>
        
      </div>
      <div className={styles.main}>
        <div className={styles.loginContainer}>
          <img src="src/png/Logo.jpg" alt="Pharmacy Logo" className={styles.logo}  style={{ width: "130px", height: "120px" }}/>
          <h2>Sign In</h2>
          <div className={styles.formGroup}>
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.signInButton} onClick={handleSignIn}>
              Sign In
            </button>
            <button className={styles.registerButton} onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
