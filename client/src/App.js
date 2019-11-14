import React from "react";
import "./App.css";
import Search from "./Search";
import Map from "./Map";

const API_KEY = "AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY"

function App() {
  return (
    <div className="App">
      <Search
        apiKey={API_KEY}
      />
      <Map
        apiKey={API_KEY}
      />
      <div></div>
    </div>
  );
}

export default App;
