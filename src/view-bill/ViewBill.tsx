import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewBill.css"; // Import der externen CSS-Datei

interface SaleItem {
  id: number;
  productName: string;
  quantity: number;
  totalPrice: number;
}

const ViewBill: React.FC = () => {
  const { date } = useParams<{ date: string }>(); // Datum aus der URL abrufen
  const [sales, setSales] = useState<SaleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(
          `https://localhost:7184/api/sales?date=${date}` 
        );
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Verkaufsdaten.");
        }
        const data: SaleItem[] = await response.json();
        setSales(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ein unbekannter Fehler ist aufgetreten.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [date]);

  if (loading) return <p>Lade Verkaufsdaten...</p>;
  if (error) return <p>Fehler: {error}</p>;

  return (
    <div className="bill-container">
      <h2>Verkäufe für den {date}</h2>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Produktname</th>
            <th>Menge</th>
            <th>Gesamtpreis (€)</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.productName}</td>
              <td>{sale.quantity}</td>
              <td>{sale.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBill;
