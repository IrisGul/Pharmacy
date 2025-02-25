import React, { useState } from "react";
import styles from "./ViewStock.module.css";
import { useNavigate } from "react-router-dom"; 

interface Medicine {
  id: number;
  medicineId: string;
  name: string;
  company: string;
  quantity: number;
  price: number;
}

const initialMedicines: Medicine[] = [
  { id: 1, medicineId: "112233", name: "Aspirin", company: "Company A", quantity: 24, price: 556 },
  { id: 2, medicineId: "111222", name: "Ibuprofen", company: "Company B", quantity: 55, price: 65 },
];

const ViewStock: React.FC = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  // Opens the confirmation dialog for deleting a medicine
  const handleDeleteMedicine = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (selectedMedicine) {
      setMedicines((prevMedicines) => prevMedicines.filter((med) => med.id !== selectedMedicine.id));
      setShowModal(false);
      setSelectedMedicine(null);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={() => navigate("/dashboard2")}>X</button>
      <h2>View Medicines</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine ID</th>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id} className={styles.tableRow}>
              <td>{medicine.id}</td>
              <td>{medicine.medicineId}</td>
              <td>{medicine.name}</td>
              <td>{medicine.company}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.price}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => handleDeleteMedicine(medicine)}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pop-up dialog for deletion */}
      {showModal && selectedMedicine && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>⚠️ Confirmation</h3>
            <p>Do you really want to delete this medicine?</p>
            <p><strong>{selectedMedicine.name}</strong></p>
            <div className={styles.buttonContainer}>
              <button className={styles.yesButton} onClick={confirmDelete}>Yes</button>
              <button className={styles.noButton} onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStock;
