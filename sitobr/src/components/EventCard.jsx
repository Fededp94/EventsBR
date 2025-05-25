import React from "react";
import "./EventCard.css";

const EventCard = ({ date, location, title, time, status, img }) => {
  return (
    <div className="event-card" style={{ backgroundImage: `url(${img})` }}>
      <div className="event-date">
        <div>{date.day}</div>
        <div>{date.monthYear}</div>
      </div>
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
