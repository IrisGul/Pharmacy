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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    // **✅ Registrierungsdaten speichern**
    localStorage.setItem("userProfile", JSON.stringify(formData));

    alert("Registration successful!");

    // **✅ Weiterleitung zur `Profile.tsx`**
    navigate("/profile");
  };


 // Schließen der Seite und zurück zu Dashboard 2
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
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <button className={styles.registerButton} onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
