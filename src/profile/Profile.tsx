import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css"; 

interface UserProfile {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Fehler beim Parsen der Benutzerdaten:", error);
        navigate("/register");
      }
    } else {
      navigate("/register"); // Falls kein Benutzer gefunden wird, leite zur Registrierung um
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userProfile"); // Benutzerdaten löschen
    navigate("/register"); // Zurück zur Registrierung
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.profileContainer}>
      <button className={styles.closeButton} onClick={handleClose}>X</button>  

      {/* Linke Sidebar */}
      <div className={styles.sidebar}>
        <h2>Profile</h2>
        <ul>
          <li><strong>Role:</strong> {user?.role}</li>
          <li><strong>Name:</strong> {user?.firstName} {user?.lastName}</li>
          <li><strong>Email:</strong> {user?.email}</li>
        </ul>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Rechte Hauptansicht */}
      <div className={styles.profileContent}>
        <h2 className={styles.welcomeText}> Welcome, {user?.firstName}!</h2>
        <p className={styles.roleText}>
          Your role: {user?.role} -  
          <span className={styles.dashboardLink} onClick={() => navigate("/dashboard2")}>
          Click here for Dashboard2
          </span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
