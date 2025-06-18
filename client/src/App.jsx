import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MapComponent from "./Map";
import StateCard from "./Card";

function App() {
  const [selectedYear, setSelectedYear] = useState("2017-18");
  const [selectedState, setSelectedState] = useState(null);

  const handleStateClick = (name, code) => {
    setSelectedState({ name, code });
  };

  return (
    <div className="main-container">
      <h1>India GSDP Map</h1>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {["2017-18", "2018-19", "2019-20", "2020-21", "2021-22", "2022-23"].map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>

      <MapComponent
        selectedYear={selectedYear}
        onStateClick={handleStateClick}
      />

      {selectedState && (
        <StateCard
          stateName={selectedState.name}
          stateCode={selectedState.code}
          selectedYear={selectedYear}
        />
      )}
    </div>
  );
}

export default App;
