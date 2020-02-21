import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import ReactTooltip from "react-tooltip";
import usedFipsCodes from "../data/cleaned/usedFipsCodes.json";
// import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const colorScale = scaleQuantize()
  .domain([1, 3])
  .range(["#d98e79", "#d4826c", "#d6866f", "#db6d4f"]);

export const MapChart = ({ stateShortName, stateFips }) => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap projection="geoAlbersUsa" data-tip="" height={600}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const stateCode = String(geo.id).slice(0, 2);
              // console.log(stateCode);
              if (stateFips !== stateCode) return;
              const cur = usedFipsCodes[geo.id];
              let len = 0;
              if (cur && cur.jurisdictions[0].State === stateShortName) {
                len = cur.jurisdictions.length;
              }
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={arg => {
                    setTooltipContent(geo.properties.name + " " + len);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: len ? colorScale(len) : "#EEE",
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
