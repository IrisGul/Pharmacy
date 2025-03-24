import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./page.module.css";

const Page: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Überprüfen, ob Eingabefelder leer sind
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter username and password!");
      return;
    }

    // Registrierte Daten aus localStorage holen
    const storedUser = localStorage.getItem("userProfile");

    if (!storedUser) {
      alert("You need to register first!");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    // Überprüfung, ob Username und Passwort übereinstimmen
    if (username === parsedUser.email && password === parsedUser.password) {
      console.log("Navigating to /dashboard");
      navigate("/dashboard");
    } else {
      alert("Invalid username or password!");
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
          <img src="src/png/Logo.jpg" alt="Pharmacy Logo" className={styles.logo} style={{ width: "130px", height: "120px" }} />
          <h2>Sign In</h2>
          <div className={styles.formGroup}>
            <label>User Name (Email)</label>
            <input
              type="text"
              placeholder="Enter your email"
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
