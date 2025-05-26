import React, { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
  {
    date: { day: "Jan 23", monthYear: "2025" },
    location: "UCFB Manchester",
    title: "UCFB Manchester Undergraduate Open Day (AM Session)",
    time: "10:00am (2 hour)",
    status: "Places Available",
    img: "https://via.placeholder.com/400x300?text=Event3",
  },
  {
    date: { day: "28 Giugno", monthYear: "2025" },
    location: "UCFB Manchester",
    title: "UCFB Manchester Undergraduate Open Day (AM Session)",
    time: "10:00am (2 hour)",
    status: "Places Available",
    img: "https://via.placeholder.com/400x300?text=Event3",
  },
];

const EventList = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = current.offsetWidth / 1.1; // quanto scorre ogni volta

    if (direction === "left") current.scrollLeft -= scrollAmount;
    else current.scrollLeft += scrollAmount;
  };

  return (
    <div className="event-list">
      <h2>Trova il tuo Evento</h2>

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
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
