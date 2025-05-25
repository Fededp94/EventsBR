import React from "react";
import EventCard from "./EventCard";
import "./EventList.css";

const events = [
  {
    date: { day: "Jan 16", monthYear: "2025" },
    location: "UCFB Wembley",
    title: "UCFB Wembley Undergraduate Open Day (AM Session)",
    time: "9:30am (2 hour)",
    status: "Places Available",
    img: "https://via.placeholder.com/400x300?text=Event1",
  },
  {
    date: { day: "Jan 16", monthYear: "2025" },
    location: "UCFB Wembley",
    title: "UCFB Wembley Undergraduate Open Day (PM Session)",
    time: "1:30pm (2 hour)",
    status: "Fully Booked",
    img: "https://via.placeholder.com/400x300?text=Event2",
  },
  {
    date: { day: "Jan 23", monthYear: "2025" },
    location: "UCFB Manchester",
    title: "UCFB Manchester Undergraduate Open Day (AM Session)",
    time: "10:00am (2 hour)",
    status: "Places Available",
    img: "https://via.placeholder.com/400x300?text=Event3",
  },
];

const EventList = () => {
  return (
    <div className="event-list">
      <h2>Trova il tuo Evento</h2>
      <div className="card-grid">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
