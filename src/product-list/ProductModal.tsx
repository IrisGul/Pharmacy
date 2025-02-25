import React, { useState } from "react";
import styles from "./ProductModal.module.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  date: string;
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
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
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
            value={formData.stock}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <label>
          Description:
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className={styles.input}
          >
            <option value="description">Description</option>
           
          </select>
        </label>
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={formData.date}
            readOnly
            className={styles.input}
          />
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
