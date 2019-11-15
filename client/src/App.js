import React from "react";
import "./App.css";
import Search from "./components/Search";
import Map from "./components/Map";
import AppointmentApp from "./components/AppointmentApp";
import Navbar from "./components/Navbar";

const API_KEY = "AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Search
        apiKey={API_KEY}
      />
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{ lat: -24.9923319, lng: 135.2252427 }}
        zoom={11}
        apiKey={API_KEY}
      />
      <div></div>
      {/* <AppointmentApp /> */}
    </div>
  );
}

export default App;
