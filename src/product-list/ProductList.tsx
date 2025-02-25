import React, { useState } from "react";
import styles from "./ProductList.module.css";
import ProductModal from "./ProductModal";
import { useNavigate } from "react-router-dom"; // Navigation hinzufügen

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  date: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Aspirin 500mg",
    category: "Painkiller",
    price: 4.99,
    stock: 20,
    status: "Active",
    date: "01-01-2024",
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    category: "Anti-inflammatory",
    price: 5.99,
    stock: 15,
    status: "Active",
    date: "01-01-2024",
  },
];

const ProductList: React.FC = () => {
  const navigate = useNavigate(); // Navigation initialisieren
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: productList.length + 1,
      name: "New Product",
      category: "Category",
      price: 0,
      stock: 0,
      status: "description",
      date: new Date().toLocaleDateString(),
    };
    setProductList([...productList, newProduct]);
  };

  const handleRemoveProducts = () => {
    if (selectedProducts.length > 0) {
      const updatedList = productList.filter(
        (product) => !selectedProducts.includes(product.id)
      );
      setProductList(updatedList);
      setSelectedProducts([]);
    } else {
      alert("Please select at least one product to remove!");
    }
  };

  const handleCheckboxChange = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
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
      <div className={styles.buttonContainer}>
        <button onClick={handleAddProduct} className={styles.addButton}>
          Add New Product
        </button>
        <button
          onClick={handleRemoveProducts}
          className={styles.removeButton}
          disabled={selectedProducts.length === 0}
        >
          Remove Product(s)
        </button>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id} className={product.name === "New Product" ? styles.newProduct : ""}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td>
                  <button
                    className={styles.productButton}
                    onClick={() => handleProductClick(product)}
                  >
                    {product.name}
                  </button>
                </td>
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
