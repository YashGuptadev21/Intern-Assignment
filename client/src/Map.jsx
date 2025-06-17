import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";

// GeoJSON URL
const geoUrl = "/state/india_state.geojson";

// State name to code mapping
const stateCodeMap = {
  "Andhra Pradesh": "AP", "Arunachal Pradesh": "AR", "Assam": "AS",
  "Bihar": "BR", "Chhattisgarh": "CT", "Goa": "GA", "Gujarat": "GJ",
  "Haryana": "HR", "Himachal Pradesh": "HP", "Jharkhand": "JH",
  "Karnataka": "KA", "Kerala": "KL", "Madhya Pradesh": "MP",
  "Maharashtra": "MH", "Manipur": "MN", "Meghalaya": "ML",
  "Mizoram": "MZ", "Nagaland": "NL", "Odisha": "OR", "Punjab": "PB",
  "Rajasthan": "RJ", "Sikkim": "SK", "Tamil Nadu": "TN",
  "Telangana": "TG", "Tripura": "TR", "Uttar Pradesh": "UP",
  "Uttarakhand": "UT", "West Bengal": "WB", "Andaman and Nicobar": "AN",
  "Chandigarh": "CH", "Dadra and Nagar Haveli and Daman and Diu": "DN",
  "Delhi": "DL", "Jammu and Kashmir": "JK", "Ladakh": "LA",
  "Lakshadweep": "LD", "Puducherry": "PY"
};

const MapComponent = ({ selectedYear, onStateClick }) => {
  const [gsdpData, setGsdpData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/data/gsdp/${selectedYear}`)
      .then((res) => res.json())
      .then((data) => setGsdpData(data))
      .catch((err) => console.error(err));
  }, [selectedYear]);   

    const getColorScale = () => {
    const values = gsdpData
      .map((d) => parseFloat(d.CurrentPrices?.replace(/,/g, "")))
      .filter((v) => !isNaN(v));
    const max = Math.max(...values);
    const min = Math.min(...values);
    return { min, max };
  };

  const getColor = (stateName) => {
    const match = gsdpData.find((d) => d.state === stateName);
    if (!match) return "#d3d3d3";

    const value = parseFloat(match.CurrentPrices?.replace(/,/g, ""));
    if (isNaN(value)) return "#d3d3d3";

    const { min, max } = getColorScale();
    const ratio = (value - min) / (max - min);
    const blue = 255 - Math.round(255 * ratio);
    const green = Math.round(150 + 105 * ratio);

    return `rgb(${blue}, ${green}, 180)`;
  };

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 1000, center: [80, 22] }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getColor(geo.properties.NAME_1)}
                onClick={() => {
                  const name = geo.properties.NAME_1;
                  const code = stateCodeMap[name];
                  onStateClick(name, code);
                }}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#f53", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))}

            {/* Labels */}
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const name = geo.properties.NAME_1;
              return (
                <Marker key={geo.rsmKey} coordinates={centroid}>
                  <text textAnchor="middle" fontSize={8} fill="#000">
                    {name}
                  </text>
                </Marker>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapComponent;
