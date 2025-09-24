import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import EventCard from "./EventCard";
import axios from "axios";
import "./EventList.css";

const EventList = ({ selectedLocation, selectedMonth }) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    axios
      .get("http://localhost:8080/api/events/public")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Errore nel caricamento eventi:", err));
  };

  useEffect(() => {
    fetchEvents();
    window.addEventListener("refreshEvents", fetchEvents);
    return () => window.removeEventListener("refreshEvents", fetchEvents);
  }, []);

  const filteredEvents = events
    .filter((event) => {
      const matchesLocation = selectedLocation
        ? event.location.toLowerCase().includes(selectedLocation.toLowerCase())
        : true;

      const matchesMonth = selectedMonth
        ? event.date && event.date.slice(5, 7) === selectedMonth
        : true;

      return matchesLocation && matchesMonth;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const scroll = (direction) => {
    const { current } = scrollRef;
    const cardWidth = 300; // larghezza della card
    const gap = 20; // gap tra le card
    const scrollAmount = 5 * (cardWidth + gap); // Scrolla esattamente 5 card
    if (direction === "left") current.scrollLeft -= scrollAmount;
    else current.scrollLeft += scrollAmount;
  };

  return (
    <div className="event-list">
      <h2>I NOSTRI EVENTI</h2>

      <div
        className="card-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {isHovered && (
          <>
            <button
              className="arrow-button left"
              onClick={() => scroll("left")}>
              <FiChevronLeft />
            </button>
            <button
              className="arrow-button right"
              onClick={() => scroll("right")}>
              <FiChevronRight />
            </button>
          </>
        )}

        <div className="card-grid scrollable" ref={scrollRef}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
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
                isAdmin={false}
              />
            ))
          ) : (
            <p style={{ padding: "1rem", color: "#666" }}>
              Nessun evento trovato per i filtri selezionati.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
