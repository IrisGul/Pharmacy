import React, { useState } from "react";
import styles from "./ProductModal.module.css";

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

interface ProductModalProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState<Product>({ ...product });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <>
      <div className={styles["modal-overlay"]} onClick={onClose}></div>
      <div className={styles.modal}>
        <h2>Product Details</h2>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label>
          Price (€):
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label>
          Stock Quantity:
          <input
            type="number"
            name="stock"
          
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label>
          Batch Number:
          <input
            type="text"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label>
          Expire Date:
          <input
            type="text"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label>
          Manufacturer:
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            
            onChange={handleInputChange}
            className={styles.input}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>

        <div className={styles["button-container"]}>
          <button onClick={handleSave} className={styles["button-save"]}>
            Save
          </button>
          <button onClick={onClose} className={styles["button-close"]}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
