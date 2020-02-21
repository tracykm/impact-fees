import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { STATES } from "../types";
import { useHistory } from "react-router-dom";
import stateAverages from "../data/cleaned/stateAverages.json";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const colorScale = scaleQuantize()
  .domain([1, 35])
  .range(["#e8d4cf", "#e3bcb1", "#d98e79", "#d4826c", "#d6866f", "#db6d4f"]);

export default function MapStates() {
  const [tooltipContent, setTooltipContent] = useState("");
  const history = useHistory();
  return (
    <>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap projection="geoAlbersUsa" data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => {
                const state = STATES.find(d => d.name === geo.properties.name);
                const ave = stateAverages[state && state.short_name] || [];
                const len = ave[0] ? ave[0].SampleJurisdictions.length : 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    fill={len ? colorScale(len) : "#EEE"}
                    onMouseEnter={arg => {
                      console.log(geo.properties.name, len);
                      setTooltipContent(geo.properties.name + " " + len);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => history.push("/state/" + state.short_name)}
                  />
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </>
  );
}
