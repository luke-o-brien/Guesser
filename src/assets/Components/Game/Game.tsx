import { useState } from "react";
import Classes from "./Game.module.scss";
import { OperatorBadge } from "../SubComponents/OperatorBadge/operatorBadge";
import { stationData } from "../../../data/StationData";
import Map from "./Map/Map";

export const Game = () => {

  // const localStorageData = localStorage.getItem('gameData')
  const [stationArray, setStationArray] = useState(stationData);
  // const [stationArray, setStationArray] = useState(localStorageData ? JSON.parse(localStorageData) : stationData);
  const [guessedStations, setGuessedstations] = useState(0);
  const [view, setView] = useState("list");
  const [guess, setGuess] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const matchedStation = stationArray.find(
      (station) =>
        station.name.toLowerCase() === guess.toLowerCase() ||
        station.displayName.toLowerCase() === guess.toLowerCase(),
    );

    if (matchedStation && matchedStation.found !== true) {
      setGuessedstations(guessedStations + 1);
      const updatedArray = stationArray.map((station) =>
          station === matchedStation ? { ...station, found: true } : station,
      ) 
      setStationArray(updatedArray);
      setGuess("");
      // localStorage.setItem("gameData", JSON.stringify(updatedArray));
    } else {
      console.log("not found");
    }
  };

  return (
    <div style={{ width: "100vw" }}>
      <div className={Classes.TopBarContainer}>
        <div className={Classes.ButtonContainer}>
          <button onClick={() => setView("list")}>List view</button>
          <button onClick={() => setView("map")}>Map view</button>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className={Classes.GuessInput}
          ></input>
        </form>
        <div className={Classes.ProgressContainer}>
          <progress
            style={{ accentColor: "purple" }}
            max={stationData.length}
            value={guessedStations}
          ></progress>
          <p>
            {guessedStations}/{stationData.length}
          </p>
        </div>
      </div>
      {view === "list" ? (
        <div>
          {stationArray.map((station, idx) => (
            <div
              key={idx}
              style={station.found ? { backgroundColor: "green" } : {}}
              className={Classes.StationPoint}
            >
              {station.found && station.displayName}
              {station.found && (
                <div className={Classes.BadgeContainer}>
                  {station.operators.map((operator, idx) => (
                    <OperatorBadge key={idx} operator={operator} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Map stationData={stationArray} />
      )}
    </div>
  );
};
