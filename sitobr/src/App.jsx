import { useState } from "react";
import React from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import EventList from "./components/EventList";

const App = () => {
  return (
    <div>
      <Header />
      <FilterBar />
      <EventList />
    </div>
  );
};

export default App;
