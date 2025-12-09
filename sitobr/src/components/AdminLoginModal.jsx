import React, { useState, useEffect } from "react";
import "./AdminLoginModal.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../api"; // ⬅️ QUI

const AdminLoginModal = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const showHandler = () => setVisible(true);
    window.addEventListener("showAdminLogin", showHandler);
    return () => window.removeEventListener("showAdminLogin", showHandler);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      setVisible(false);
      navigate("/admin-panel");
    } catch (err) {
      setError("Credenziali non valide");
    }
  };

  if (!visible) return null;

  return (
    <div className="admin-login-modal">
      <div className="modal-content">
        <h2>Login Admin</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin}>Accedi</button>
        <button className="close" onClick={() => setVisible(false)}>
          Chiudi
        </button>
      </div>
    </div>
  );
};

export default AdminLoginModal;
