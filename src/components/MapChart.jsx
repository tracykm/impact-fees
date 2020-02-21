import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import ReactTooltip from "react-tooltip";
import usedFipsCodes from "../data/cleaned/usedFipsCodes.json";
// import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
  ]);

export const MapChart = () => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap projection="geoAlbersUsa" data-tip="" height={600}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const cur = usedFipsCodes[geo.id];
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={arg => {
                    setTooltipContent(geo.properties.name);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: colorScale(cur ? cur.jurisdictions.length : "#EEE"),
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};
