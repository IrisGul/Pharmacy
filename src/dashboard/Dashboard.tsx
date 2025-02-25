import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";


const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.grid}>
        <button className={styles.card} onClick={() => navigate("/register")}>
          <img src="src/png/user-add_114450.png" alt="Add User" style={{ width: "50px", height: "50px" }}/>
          <span>Add User</span>
        </button>
        <button className={styles.card} onClick={() => navigate("/profile")}>
          <img src="src/png/profile.png" alt="Profile" style={{ width: "50px", height: "50px" }}/>
          <span>Profile</span>
        </button>
        <button className={styles.card} onClick={() => navigate("/view-users")}>
          <img src="src/png/view-user.png" alt="View User"  style={{ width: "50px", height: "50px" }} />
          <span>View User</span>
          

        </button>
        
        <button className={styles.card}>
          <img src="src/png/update.png" alt="Update" style={{ width: "50px", height: "50px" }}/>
          <span>Update User</span>
        </button>

        <button className={styles.card} onClick={() => navigate("/")}>
          <img src="src/png/logout.png" alt="Logout"  style={{ width: "50px", height: "50px" }}/>
          <span>Logout</span>
        </button>

        <button className={styles.card}  onClick={() => navigate("/dashboard2")}>
          <img src="src/png/next dash.png" alt="Exit" style={{ width: "50px", height: "50px" }} />
          <span>POS</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
