import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard2.module.css";

const Dashboard2: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Point of Sale </h1>
      <div className={styles.grid}>
        <button
          className={`${styles.card} ${styles.special}`}
          onClick={() => navigate("/product-list")}
        >
          <img src="src/png/add madicine.png" alt="Add Medicine" />
          Add Medicine
        </button>

        <button
          className={styles.card}
          onClick={() => navigate("/sell-medicine")}
        >
          <img src="src/png/sell-med.png" alt="Sell Medicine" />
          Sell Medicine
        </button>

        <button
          className={styles.card}
          onClick={() => navigate("/view-medicine")}
        >
          <img src="src/png/view-med.png" alt="View Medicine" />
          View Stock
        </button>

        <button className={styles.card} onClick={() => navigate("/view-bill")}>
          <img src="src/png/bill.png" alt="View Bill" />
          View Bill
        </button>

        <button
          className={styles.card}
          onClick={() => navigate("/update-medicine")}
        >
          <img src="src/png/update.png" alt="Update Medicine" />
          Update
        </button>

        <button className={styles.card} onClick={() => navigate("/")}>
          <img src="src/png/logout.png" alt="Logout" />
          Exit
        </button>

        <button className={styles.card} onClick={() => navigate("/dashboard")}>
          <img src="src/png/next dash.png" alt="Dash" />
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default Dashboard2;
