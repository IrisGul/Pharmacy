import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page from "./pages/Page"; // Korrigierte Verbindung
import RegisterPage from "./pages/RegisterPage";
import ProductList from "./product-list/ProductList";
import Profile from "./profile/Profile";

import Dashboard from "./dashboard/Dashboard";
import ViewUsers from "./view-users/ViewUsers";
import Dashboard2 from "./dashboard/Dashboard2"; // Importiere das neue Dashboard
import SellMedicine from "./sell-medicine/SellMedicine";
import ViewStock from "./view-stock/ViewStock";
import ViewBill from "./view-bill/ViewBill";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} /> {/* Startseite */}
        <Route path="/register" element={<RegisterPage />} />{" "}
        {/* Registrierung */}
        <Route path="/product-list" element={<ProductList />} />{" "}
        {/* Produktliste */}
        <Route path="/profile" element={<Profile />} />
        {/* Pfile Seite*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view-users" element={<ViewUsers />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />{" "}
        {/* Neues Dashboard */}
        <Route path="/sell-medicine" element={<SellMedicine />} />
        <Route path="/view-medicine" element={<ViewStock />} />
        <Route path="/view-bill" element={<ViewBill />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
