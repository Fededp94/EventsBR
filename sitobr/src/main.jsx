import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import ChiSiamoPage from "./components/ChiSiamoPage.jsx"; // 👈 importa qui
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/chi-siamo" element={<ChiSiamoPage />} />{" "}
        {/* 👈 AGGIUNTA */}
      </Routes>
    </Router>
  </React.StrictMode>
);
