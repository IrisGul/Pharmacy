import React, { useState, useEffect } from "react";
import styles from "./ViewStock.module.css";
import { useNavigate } from "react-router-dom";

interface Medicine {
  id: number;
  name: string;
  description: string;
  batchNumber: string;
  expireDate: string;
  manufacturer: string;
  category: string;
  price: number;
}

const ViewStock: React.FC = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const [newMedicine, setNewMedicine] = useState<Omit<Medicine, "id">>({
    name: "",
    description: "",
    batchNumber: "",
    expireDate: "",
    manufacturer: "",
    category: "",
    price: 0,
  });

  const API_URL = "https://localhost:7184/swagger/index.html"; // <--- Hier ggf. anpassen

  // FETCH: Alle Medikamente vom Backend laden
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = () => {
    setLoading(true);
    fetch("https://localhost:7184/swagger/index.html")
      .then((res) => res.json())
      .then((data: Medicine[]) => {
        setMedicines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Medikamente:", err);
        setLoading(false);
      });
  };

  // DELETE: Medikament vom Backend löschen
  const confirmDelete = () => {
    if (!selectedMedicine) return;

    fetch(`${API_URL}/${selectedMedicine.id}`, {
      // brauche-> Saman DELETE
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setMedicines((prev) =>
            prev.filter((m) => m.id !== selectedMedicine.id)
          );
        } else {
          console.error("Fehler beim Löschen");
        }
        setShowModal(false);
        setSelectedMedicine(null);
      })
      .catch((err) => {
        console.error("Fehler beim Löschen:", err);
        setShowModal(false);
      });
  };

  const handleDeleteMedicine = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  // POST: Neues Medikament zum Backend senden
  const handleAddMedicine = () => {
    fetch("https://localhost:7184/api/ApiPharmacy/products", {
      // Saman
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMedicine),
    })
      .then((res) => res.json())
      .then((savedMedicine: Medicine) => {
        setMedicines((prev) => [...prev, savedMedicine]);
        setNewMedicine({
          name: "",
          description: "",
          batchNumber: "",
          expireDate: "",
          manufacturer: "",
          category: "",
          price: 0,
        });
        setShowAddForm(false);
      })
      .catch((err) => {
        console.error("Fehler beim Hinzufügen:", err);
      });
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.closeButton}
        onClick={() => navigate("/dashboard2")}
      >
        X
      </button>
      <h2>
        View Medicines{" "}
        <button
          className={styles.addButton}
          onClick={() => setShowAddForm(true)}
        >
          ➕ Add Medicine
        </button>
      </h2>

      {loading ? (
        <p>Lade Medikamente...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Category</th>
              <th>Batch</th>
              <th>Expire Date</th>
              <th>Price (€)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id} className={styles.tableRow}>
                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.manufacturer}</td>
                <td>{medicine.category}</td>
                <td>{medicine.batchNumber}</td>
                <td>{medicine.expireDate}</td>
                <td>{medicine.price.toFixed(2)}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteMedicine(medicine)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Modal */}
      {showModal && selectedMedicine && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>⚠️ Confirmation</h3>
            <p>Do you really want to delete this medicine?</p>
            <p>
              <strong>{selectedMedicine.name}</strong>
            </p>
            <div className={styles.buttonContainer}>
              <button className={styles.yesButton} onClick={confirmDelete}>
                Yes
              </button>
              <button
                className={styles.noButton}
                onClick={() => setShowModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>➕ Add New Medicine</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddMedicine();
              }}
            >
              <input
                placeholder="Name"
                required
                value={newMedicine.name}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, name: e.target.value })
                }
              />
              <input
                placeholder="Description"
                required
                value={newMedicine.description}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    description: e.target.value,
                  })
                }
              />
              <input
                placeholder="Batch Number"
                required
                value={newMedicine.batchNumber}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    batchNumber: e.target.value,
                  })
                }
              />
              <input
                type="date"
                required
                value={newMedicine.expireDate}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, expireDate: e.target.value })
                }
              />
              <input
                placeholder="Manufacturer"
                required
                value={newMedicine.manufacturer}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    manufacturer: e.target.value,
                  })
                }
              />
              <input
                placeholder="Category"
                required
                value={newMedicine.category}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, category: e.target.value })
                }
              />
              <input
                type="number"
                step="0.01"
                required
                placeholder="Price"
                value={newMedicine.price}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    price: parseFloat(e.target.value),
                  })
                }
              />
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.yesButton}>
                  Add
                </button>
                <button
                  type="button"
                  className={styles.noButton}
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStock;
