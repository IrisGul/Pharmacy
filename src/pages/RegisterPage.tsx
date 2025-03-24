import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "User", // Default role
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password: string) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const lengthValid = password.length >= 6;

    const score = [hasUpper, hasLower, hasNumber, hasSpecial, lengthValid].filter(Boolean).length;

    // Passwortstärke bewerten
    if (score <= 2) {
      setPasswordStrength("weak"); // Rot
    } else if (score === 3 || score === 4) {
      setPasswordStrength("medium"); // hellgrün
    } else if (score === 5) {
      setPasswordStrength("strong"); // Dunkelgrün
    } else {
      setPasswordStrength("");
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "#FF6347"; // Rot
      case "medium":
        return "#90EE90"; // Hellgrün
      case "strong":
        return "#006400"; // Dunkelgrün
      default:
        return "";
    }
  };

  const handleRegister = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.role ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 13 characters long!");
      return;
    }

    if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
      //*!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    ) {
      alert("Password must contain uppercase, lowercase, numbers!");
      return;
    }

    // **✅ Registrierungsdaten speichern**
    localStorage.setItem("userProfile", JSON.stringify(formData));

    alert("Registration successful!");
    navigate("/profile");
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={handleClose}>X</button>
      <div className={styles.registerBox}>
        <h2>Register Account</h2>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Pharmacist">Pharmacist</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ backgroundColor: getStrengthColor() }}
          />
          <small>
            Must be at least 6 characters long, and include uppercase, lowercase and numbers.
          </small>
        </div>
        <div className={styles.formGroup}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button className={styles.registerButton} onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
