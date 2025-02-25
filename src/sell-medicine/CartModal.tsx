import React from "react";
import styles from "./CartModal.module.css";

interface CartModalProps {
  cart: {
    id: string;
    name: string;
    company: string;
    price: number;
    quantity: number;
    totalPrice: number;
  }[];
  setCart: (cart: any[]) => void;
  onClose: () => void;
  onPrint: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ cart, setCart, onClose, onPrint }) => {
  // Artikel aus dem Warenkorb entfernen
  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.cartModal}>
      <h3>🛒 Your Cart</h3>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.quantity}x {item.name} ({item.company}) - {item.totalPrice} €
              <button onClick={() => removeFromCart(index)}>❌ Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onPrint}>🖨 Print Invoice</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CartModal;
