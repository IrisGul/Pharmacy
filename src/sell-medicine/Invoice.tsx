import React from "react";
import styles from "./Invoice.module.css";

interface InvoiceProps {
  billId: string;
  date: string;
  totalPaid: number;
  items: {
    id: string;
    name: string;
    company: string;
    price: number;
    quantity: number;
    totalPrice: number;
  }[];
  onClose: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({ billId, date, totalPaid, items, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.invoiceContainer}>
      <h2>Leipziger Apotheke</h2>
      <p>Leipziger Straße 43, 10117 Berlin</p>
      <p>Telefon: 030/2043031</p>
      <hr />
      <p><strong>Bill ID:</strong> {billId}</p>
      <p><strong>Date:</strong> {date}</p>
      <hr />
      {items.map((item, index) => (
        <p key={index}>
          {item.quantity} x {item.name} ({item.company}) - {item.price} €  
          <span className={styles.priceRight}>{item.totalPrice} €</span>
        </p>
      ))}
      <hr />
      <p><strong>Total Paid:</strong> {totalPaid} €</p>
      <p>Thank you for your purchase!</p>
      <button onClick={handlePrint} className={styles.printButton}>Print</button>
      <button onClick={onClose} className={styles.closeButton}>Close</button>
    </div>
  );
};

export default Invoice;
