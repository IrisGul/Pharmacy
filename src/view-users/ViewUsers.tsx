import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ViewUsers.module.css";

const users = [
  { id: 1, name: "John", lastname: "Doe", role: "Admin", date: "January 29, 2025", startTime: "09:00", endTime: "17:00", email: "john.doe@example.com" },
  { id: 2, name: "Alice", lastname: "Smith", role: "User", date: "January 29, 2025", startTime: "10:00", endTime: "18:00", email: "alice.smith@example.com" },
  { id: 3, name: "Bob", lastname: "Müller", role: "Pharmacist", date: "January 29, 2025", startTime: "08:30", endTime: "16:30", email: "bob.mueller@example.com" }
];

const ViewUsers: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>Sales History</h2>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Date</th>
            <th>Working Hours</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.role}</td>
              <td>{user.date}</td>
              <td>{user.startTime} - {user.endTime}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.backButton} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default ViewUsers;
