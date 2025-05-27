import React from "react";
import "./EventCard.css";

const EventCard = ({ date, location, title, time, status, img }) => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("it-IT", options);
  };

  return (
    <div className="event-card" style={{ backgroundImage: `url(${img})` }}>
      <div className="event-date">{formatDate(date)}</div>
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
