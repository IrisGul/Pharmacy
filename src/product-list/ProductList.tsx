import React, { useState, useEffect } from "react";
import styles from "./ProductList.module.css";
import ProductModal from "./ProductModal";
import { useNavigate } from "react-router-dom";
import * as Papa from "papaparse";
 // CSV Parser Library importieren

// ✅ Neue Schnittstelle basierend auf deiner CSV-Datei
interface Product {
  id: number;
  name: string;
  description: string;
  batchNumber: string;
  expireDate: string;
  manufacturer: string;
  category: string;
  price: number;
}

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  // ✅ CSV-Datei aus dem public-Ordner laden
  useEffect(() => {
    fetch("/product-list.csv") // Datei aus dem `public/`-Ordner laden
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            if (!result.data.length) {
              setUploadStatus("⚠️ Datei ist leer oder ungültig.");
              return;
            }

            const products: Product[] = result.data.map((row: any, index: number) => ({
              id: Number(row.ID) || index + 1,
              name: row["Product Name"] || "Unbekanntes Produkt",
              description: row.Description || "Keine Beschreibung",
              batchNumber: row["Batch Number"] || "N/A",
              expireDate: row["Expire Date"] || "N/A",
              manufacturer: row.Manufacturer || "Unbekannter Hersteller",
              category: row.Category || "Unbekannte Kategorie",
              price: parseFloat(row.Price) || 0,
            }));

            setProductList(products);
            setUploadStatus("✅ CSV-Datei erfolgreich geladen!");
          },
          error: (error: Error) => {
            console.error("Fehler beim Parsen der CSV-Datei:", error);
            setUploadStatus("❌ Fehler beim Laden der CSV-Datei.");
          },
          
        });
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der CSV-Datei:", error);
        setUploadStatus("❌ Fehler beim Abrufen der CSV-Datei.");
      });
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    const updatedList = productList.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProductList(updatedList);
    setShowModal(false);
  };

  const handleRemoveProducts = () => {
    if (selectedProducts.length > 0) {
      const updatedList = productList.filter(
        (product) => !selectedProducts.includes(product.id)
      );
      setProductList(updatedList);
      setSelectedProducts([]);
    } else {
      alert("Bitte mindestens ein Produkt auswählen!");
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((productId) => productId !== id) : [...prev, id]
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Dashboard2 aufrufen
  const handleClose = () => {
    navigate("/dashboard2");
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={handleClose}>X</button>
      <h1>Products</h1>

      {/* Statusnachricht anzeigen */}
      {uploadStatus && <p className={styles.uploadStatus}>{uploadStatus}</p>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Batch Number</th>
              <th>Expire Date</th>
              <th>Manufacturer</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.batchNumber}</td>
                <td>{product.expireDate}</td>
                <td>{product.manufacturer}</td>
                <td>{product.category}</td>
                <td>{product.price.toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onSave={handleSaveProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductList;
