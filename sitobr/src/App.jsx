import { useState } from "react";
import React from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import EventList from "./components/EventList";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div>
      <Header />
      <FilterBar />
      <EventList />
      <Footer />
    </div>
  );
};

export default App;
