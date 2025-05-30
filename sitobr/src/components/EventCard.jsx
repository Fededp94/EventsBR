import React, { useState } from "react";
import "./EventCard.css";
import { FaTrash, FaEdit } from "react-icons/fa";

const EventCard = ({
  id,
  date,
  location,
  title,
  time,
  status,
  img,
  description,
  onDelete,
  onEdit,
  isAdmin,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  let timer;

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("it-IT", options);
  };

  const handleMouseEnter = () => {
    timer = setTimeout(() => setShowDescription(true), 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setShowDescription(false);
  };

  return (
    <div
      className="event-card"
      style={{ backgroundImage: `url(${img})` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="event-date">{formatDate(date)}</div>

      {showDescription && (
        <div className="event-description-bubble">{description}</div>
      )}

      {isAdmin && (
        <div className="event-actions">
          <button onClick={() => onEdit(id)}>
            <FaEdit />
          </button>
          <button onClick={() => onDelete(id)}>
            <FaTrash />
          </button>
        </div>
      )}

      <div className="event-info">
        <p className="event-status">{status}</p>
        <h3>{title}</h3>
        <p>
          {location} • {time}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
