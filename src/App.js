import React, { useRef, useState, useCallback, useEffect } from "react";
import "./App.css";
import videojs from "video.js";

import VideoJS from "./components/VideoJS";

function App() {
  // const [rows, setRows] = useState(0);
  // const [columns, setColumns] = useState(0);
  const [rowColValues, setRowColValues] = useState({ row: 0, column: 0 });
  const [tempRowCol, setRowCol] = useState({ row: 0, column: 0 });
  const [buttonUsed, setButtonUsed] = useState(0);

  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "rows") {
      setRowCol((prevState) => ({ ...prevState, row: value }));
    } else if (name === "columns") {
      setRowCol((prevState) => ({ ...prevState, column: value }));
    }
  };

  const generateGrid = useCallback(() => {
    console.log("function generate");
    const grid = [];
    for (let i = 0; i < rowColValues.row; i++) {
      const row = [];
      for (let j = 0; j < rowColValues.column; j++) {
        row.push(
          <div key={`${i}-${j}`} className="grid-cell">
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        );
      }
      grid.push(
        <div key={i} className="grid-row">
          {row}
        </div>
      );
    }
    return grid;
  }, [rowColValues.row, rowColValues.column]);

  return (
    <div className="App">
      <div className="sidePanel">
        <h1>Create Video Wall</h1>
        <div className="inputWrapper">
          <div style={{ display: "inline-block" }}>
            <div className="rc">
              <p style={{ padding: "0px", margin: "0px", marginBottom: "5px" }}>
                Rows:
              </p>
              <input
                style={{ width: "60px" }}
                type="number"
                name="columns"
                value={tempRowCol.column}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div style={{ display: "inline-block" }}>
            <div className="rc">
              <p style={{ padding: "0px", margin: "0px", marginBottom: "5px" }}>
                Columns:
              </p>
              <input
                style={{ width: "60px" }}
                type="number"
                name="rows"
                value={tempRowCol.row}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            onClick={() => {
              setRowColValues(tempRowCol);
            }}
          >
            Create
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: "15px",
          }}
        >
          <button
            onClick={() => {
              setRowColValues({ row: 3, column: 2 });
            }}
          >
            2X3
          </button>
          <button
            onClick={() => {
              setRowColValues({ row: 4, column: 3 });
            }}
          >
            3X4
          </button>
          <button
            onClick={() => {
              setRowColValues({ row: 5, column: 4 });
            }}
          >
            4X5
          </button>
          <button
            onClick={() => {
              setRowColValues({ row: 6, column: 5 });
            }}
          >
            5X6
          </button>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${rowColValues.row}, 1fr)`,
        }}
      >
        {generateGrid()}
      </div>
    </div>
  );
}

export default React.memo(App);
