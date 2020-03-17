import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import ReactTooltip from "react-tooltip";
import usedFipsCodes from "../data/cleaned/usedFipsCodes.json";
import styled from "styled-components";
// import { csv } from "d3-fetch";

const StyleDiv = styled.div`
  position: relative;
  .controls {
    display: flex;
    position: absolute;
    top: 0;
    left: 50%;
    margin: 1.25rem 0;
    text-align: center;
    transform: translateX(-50%);
  }

  .controls > button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 2rem;
    width: 2rem;
    background: #ff5533;
    color: #fff;
    border-radius: 100%;
    border: 0;
  }
  .controls > button:first-child {
    margin-right: 0.25rem;
  }
`;

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const colorScale = scaleQuantize()
  .domain([1, 3])
  .range(["#d98e79", "#d4826c", "#d6866f", "#db6d4f"]);

export const MapChart = ({ stateShortName, stateFips }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [zoom, setZoom] = useState(0.5);
  function handleZoomIn() {
    if (zoom >= 4) return;
    setZoom(zoom * 2);
  }

  function handleZoomOut() {
    if (zoom <= 0.5) return;
    setZoom(zoom / 2);
  }

  function handleZoomEnd(position) {
    setZoom(position.zoom);
  }

  return (
    <StyleDiv>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projection="geoAlbersUsa"
        data-tip=""
        height={300}
        width={500}
      >
        <ZoomableGroup
          center={[-100, 37]}
          zoom={zoom}
          onZoomEnd={handleZoomEnd}
        >
          >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateCode = String(geo.id).slice(0, 2);
                if (stateFips !== stateCode) {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "#ddd",
                          outline: "none"
                        },
                        hover: {
                          fill: "#ddd",
                          outline: "none"
                        },
                        active: {
                          fill: "#ddd",
                          outline: "none"
                        }
                      }}
                    />
                  );
                }
                const cur = usedFipsCodes[geo.id];
                let len = 0;
                let jurisdictions;
                if (cur && cur.jurisdictions[0].State === stateShortName) {
                  len = cur.jurisdictions.length;
                  jurisdictions = cur.jurisdictions.map(j => (
                    <div key={j.Jurisdiction}>{j.Jurisdiction}</div>
                  ));
                }
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={arg => {
                      setTooltipContent(
                        <div>
                          <b>{geo.properties.name}</b> ({len}){jurisdictions}
                        </div>
                      );
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
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </StyleDiv>
  );
};
