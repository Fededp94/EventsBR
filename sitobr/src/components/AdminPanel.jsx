import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    status: "",
    image: null,
  });

  const [preview, setPreview] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events/admin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Errore caricamento eventi:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageForm = new FormData();
      imageForm.append("file", form.image);
      const uploadRes = await axios.post(
        "http://localhost:8080/api/events/admin/upload",
        imageForm
      );
      const imageUrl = uploadRes.data;

      const eventData = { ...form, imageUrl };
      delete eventData.image;

      await axios.post("http://localhost:8080/api/events/admin", eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Evento pubblicato!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("❌ Errore nella pubblicazione dell'evento");
    }
  };

  const renderPreviewCard = () => {
    const imagePreview = form.image ? URL.createObjectURL(form.image) : "";
    const formattedDate = form.date;

    return (
      <div className="preview-container">
        <h4>Anteprima Evento</h4>
        <EventCard
          date={formattedDate}
          location={form.location}
          title={form.title}
          time={form.time}
          status={form.status}
          img={imagePreview}
        />
        <button
          className="cancel-preview-button"
          onClick={() => setPreview(false)}>
          Annulla Anteprima
        </button>
      </div>
    );
  };

  return (
    <div className="admin-panel">
      <h2>Crea un nuovo evento</h2>
      <div className="form-preview-wrapper">
        <form onSubmit={handleSubmit} className="event-form">
          <input
            name="title"
            placeholder="Titolo"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Descrizione"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Luogo"
            value={form.location}
            onChange={handleChange}
            required
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required>
            <option value="">Seleziona stato</option>
            <option value="Posti disponibili">Posti disponibili</option>
            <option value="Sold out">Sold out</option>
          </select>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" onClick={() => setPreview(true)}>
              Anteprima
            </button>
            <button type="submit">Pubblica Evento</button>
          </div>
        </form>

        {preview && renderPreviewCard()}
      </div>

      <h3 className="mt-5">Eventi pubblicati</h3>
      <div className="eventi-pubblicati">
        {events.map((event) => (
          <EventCard
            key={event.id}
            date={event.date}
            location={event.location}
            title={event.title}
            time={event.time}
            status={event.status}
            img={event.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
