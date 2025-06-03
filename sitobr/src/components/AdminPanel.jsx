import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "./EventCard";
import "./AdminPanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();
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
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("http://localhost:8080/api/events/admin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Errore caricamento eventi:", err));
  };

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
      let imageUrl = null;

      if (form.image && typeof form.image !== "string") {
        const imageForm = new FormData();
        imageForm.append("file", form.image);
        const uploadRes = await axios.post(
          "http://localhost:8080/api/events/admin/upload",
          imageForm
        );
        imageUrl = uploadRes.data;
      } else if (typeof form.image === "string") {
        imageUrl = form.image;
      }

      const eventData = { ...form, imageUrl };
      delete eventData.image;

      console.log("📦 Evento da inviare:", eventData);

      if (!imageUrl) {
        alert("❌ Nessuna immagine caricata, impossibile salvare l'evento.");
        return;
      }

      if (editingId) {
        await axios.put(
          `http://localhost:8080/api/events/admin/${editingId}`,
          eventData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("✅ Evento aggiornato!");
      } else {
        await axios.post("http://localhost:8080/api/events/admin", eventData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Evento pubblicato!");
        window.dispatchEvent(new Event("refreshEvents")); // 🔁 aggiorna homepage
      }

      setForm({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        status: "",
        image: null,
      });
      setEditingId(null);
      setPreview(false);
      fetchEvents();
    } catch (err) {
      console.error("❌ Errore evento:", err);
      if (err.response && err.response.data) {
        alert(`Errore dal server: ${JSON.stringify(err.response.data)}`);
      } else {
        alert("❌ Errore generico nella pubblicazione/aggiornamento evento");
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Vuoi davvero eliminare questo evento?")) {
      try {
        await axios.delete(`http://localhost:8080/api/events/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchEvents();
      } catch (err) {
        console.error(err);
        alert("❌ Errore durante l'eliminazione dell'evento");
      }
    }
  };

  const handleEdit = (id) => {
    const eventToEdit = events.find((e) => e.id === id);
    if (eventToEdit) {
      setForm({
        title: eventToEdit.title,
        description: eventToEdit.description,
        location: eventToEdit.location,
        date: eventToEdit.date,
        time: eventToEdit.time,
        status: eventToEdit.status,
        image: eventToEdit.imageUrl,
      });
      setEditingId(id);
      setPreview(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPreviewCard = () => {
    const imagePreview =
      form.image && typeof form.image !== "string"
        ? URL.createObjectURL(form.image)
        : form.image;

    return (
      <div className="preview-wrapper">
        <h4>Anteprima Evento</h4>
        <EventCard
          date={form.date}
          location={form.location}
          title={form.title}
          time={form.time}
          status={form.status}
          img={imagePreview}
          description={form.description}
          isAdmin={false}
        />
        <button
          className="cancel-preview-button"
          onClick={() => {
            setPreview(false);
            setEditingId(null);
          }}>
          Annulla Anteprima
        </button>
      </div>
    );
  };

  return (
    <div className="admin-panel">
      <button onClick={() => navigate("/")} className="back-to-public-button">
        ⬅ Torna alla pagina pubblica
      </button>

      <div className="form-preview-container">
        <div className="form-section">
          <h2>{editingId ? "Modifica evento" : "Crea un nuovo evento"}</h2>
          <form onSubmit={handleSubmit} className="event-form">
            <input
              name="title"
              placeholder="Titolo"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
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
              value={form.status}
              onChange={handleChange}
              name="status"
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
              required={!editingId}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="button" onClick={() => setPreview(true)}>
                Anteprima
              </button>
              <button type="submit">
                {editingId ? "Aggiorna Evento" : "Pubblica Evento"}
              </button>
            </div>
          </form>
        </div>

        {preview && renderPreviewCard()}
      </div>

      <h3 className="mt-5">Eventi pubblicati</h3>
      <div className="eventi-pubblicati">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            date={event.date}
            location={event.location}
            title={event.title}
            time={event.time}
            status={event.status}
            img={event.imageUrl}
            description={event.description}
            isAdmin={true}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
