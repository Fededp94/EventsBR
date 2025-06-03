import React, { useState } from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import EventList from "./components/EventList";
import Footer from "./components/Footer";
import AdminLoginModal from "./components/AdminLoginModal";
import "./App.css"; // assicurati di avere il file CSS

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  return (
    <div className="app-wrapper">
      <div className="main-content">
        <Header />
        <FilterBar
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <EventList
          selectedLocation={selectedLocation}
          selectedMonth={selectedMonth}
        />
      </div>
      <Footer />
      <AdminLoginModal />
    </div>
  );
};

export default App;
