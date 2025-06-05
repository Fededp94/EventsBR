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
  const [flipped, setFlipped] = useState(false);
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

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`event-card ${flipped ? "flipped" : ""}`}
      onClick={toggleFlip}>
      <div className="event-card-inner">
        {/* Lato Front */}
        <div
          className="event-card-front"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <img src={img} alt={title} />
          <div className="event-date">{formatDate(date)}</div>

          {showDescription && (
            <div className="event-description-bubble">{description}</div>
          )}

          {isAdmin && (
            <div className="event-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}>
                <FaEdit />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}>
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

        {/* Lato Back */}
        <div className="event-card-back">
          <div className="event-description-text">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
