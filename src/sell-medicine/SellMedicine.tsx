import React, { useState, useEffect } from "react";
import styles from "./SellMedicine.module.css";
import { useNavigate } from "react-router-dom";
import Invoice from "./Invoice";
import CartModal from "./CartModal";
import Papa from "papaparse"; // ✅ CSV-Parser importieren

interface Medicine {
  id: string;
  name: string;
  company: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

const SellMedicine: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineList, setMedicineList] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [cart, setCart] = useState<Medicine[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  
  useEffect(() => {
    fetch("/medicine-list.csv") // Datei aus `public/` laden
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
          complete: (result) => { 
            
            if (!result.data.length) {
              setUploadStatus("⚠️ Datei ist leer oder ungültig.");
              return;
            }
  
            const medicines: Medicine[] = result.data.map((row: any) => {
              console.log("Row Data:", row); // 🔹 Hier prüfen
            
              return {
                id: row["ID"] || "Unknown",
                name: row["Product Name"] || "Unbekanntes Produkt",
                description: row["Description"] || "Keine Beschreibung",
                batchNumber: row["Batch Number"] || "N/A",
                expireDate: row["Expire Date"] || "N/A",
                company: row["Manufacturer"] || "Unbekannter Hersteller",
                category: row["Category"] || "Unbekannte Kategorie",
                price: parseFloat(row["Price"]) || 0,
                quantity: 1,
                totalPrice: parseFloat(row["Price"]) || 0,
              };
            });
            
  
            setMedicineList(medicines);
            setFilteredMedicines(medicines);
            setUploadStatus("✅ CSV-Datei erfolgreich geladen!");
          },
          error: (error: unknown) => {
            console.error("Fehler beim Parsen der CSV-Datei:", error);
            setUploadStatus("❌ Fehler beim Laden der CSV-Datei.");
          },
        });
      })
      .catch((error: unknown) => {
        console.error("Fehler beim Abrufen der CSV-Datei:", error);
        setUploadStatus("❌ Fehler beim Abrufen der CSV-Datei.");
      });
  }, []);
  
  

  // Suchfeld-Funktion
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredMedicines(
      medicineList.filter((med) =>
        med.name.toLowerCase().includes(term) || med.id.includes(term)
      )
    );
  };

  // Medikament auswählen
  const handleSelectMedicine = (medicine: Medicine) => {
    setSelectedMedicine({ ...medicine, quantity: 1, totalPrice: medicine.price });
  };

  // Menge ändern
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMedicine) {
      const qty = parseInt(e.target.value) || 1;
      setSelectedMedicine({
        ...selectedMedicine,
        quantity: qty,
        totalPrice: qty * selectedMedicine.price,
      });
    }
  };

  // Medikament in den Warenkorb hinzufügen
  const handleAddToCart = () => {
    if (!selectedMedicine) {
      alert("Bitte zuerst ein Medikament auswählen!");
      return;
    }
    setCart([...cart, selectedMedicine]);
    setSelectedMedicine(null);
    setShowCart(true); // Warenkorb öffnen
  };

  // Warenkorb öffnen
  const handleOpenCart = () => {
    setShowCart(true);
  };

  // Warenkorb schließen
  const handleCloseCart = () => {
    setShowCart(false);
  };

  // Rechnung anzeigen
  const handlePrint = () => {
    setShowInvoice(true);
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={() => navigate("/dashboard2")}>X</button>
      <h2>Sell Medicine</h2>

      <button onClick={handleOpenCart}>🛒 View Cart</button>

      {uploadStatus && <p className={styles.uploadStatus}>{uploadStatus}</p>}

      {showCart && (
        <CartModal cart={cart} setCart={setCart} onClose={handleCloseCart} onPrint={handlePrint} />
      )}

      {showInvoice && (
        <Invoice
          billId={`Bill-${Date.now()}`}
          date={new Date().toLocaleString()}
          totalPaid={cart.reduce((sum, item) => sum + item.totalPrice, 0)}
          items={cart}
          onClose={() => setShowInvoice(false)}
        />
      )}

      <div className={styles.layout}>
        <div className={styles.searchSection}>
          <label>Search</label>
          <input type="text" value={searchTerm} onChange={handleSearchChange} />
          <div className={styles.medicineList}>
            <b>Medicines</b>
            {filteredMedicines.map((med) => (
              <div key={med.id} className={styles.medicineItem} onClick={() => handleSelectMedicine(med)}>
                {med.id} - {med.name}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.detailsSection}>
          <label>Medicine ID</label>
          <input type="text" value={selectedMedicine?.id || ""} readOnly />

          <label>Name</label>
          <input type="text" value={selectedMedicine?.name || ""} readOnly />

          <label>Company Name</label>
          <input type="text" value={selectedMedicine?.company || ""} readOnly />

          <label>Price Per Unit (€)</label>
          <input type="number" value={selectedMedicine?.price || 0} readOnly />

          <label>No. of Units</label>
          <input type="number" value={selectedMedicine?.quantity || 1} onChange={handleQuantityChange} />

          <label>Total Price (€)</label>
          <input type="number" value={selectedMedicine?.totalPrice || 0} readOnly />

          <button className={styles.addButton} onClick={handleAddToCart}>
            🛒 Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellMedicine;
