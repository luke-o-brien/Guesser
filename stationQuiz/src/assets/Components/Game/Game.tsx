import { useState } from "react";
import Classes from "./Game.module.scss";
import { OperatorBadge } from "../SubComponents/OperatorBadge/operatorBadge";
import { stationData } from '../../../data/StationData'

export const Game = () => {
  const [guessedStations, setGuessedstations] = useState(0);

  const [guess, setGuess] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(guess);
    const matchedStation = stationArray.find(
      (station) =>
        station.name.toLowerCase() === guess.toLowerCase() ||
        station.displayName.toLowerCase() === guess.toLowerCase(),
    );
    if (matchedStation && matchedStation.found !== true) {
      setGuessedstations(guessedStations + 1);
      matchedStation.found = true;
      setStationArray(
        stationArray.map((station) =>
          station === matchedStation ? { ...station, found: true } : station,
        ),
      );
      setGuess("");
    } else {
      console.log("not found");
    }
  };
  const [stationArray, setStationArray] = useState(stationData);
  return (
    <div style={{ width: "50vw" }}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        ></input>
      </form>
      <progress
        style={{ accentColor: "purple" }}
        max={14}
        value={guessedStations}
      ></progress>
      <p>{guessedStations}/14</p>
      {stationArray.map((station, idx) => (
        <div
          key={idx}
          style={station.found ? { backgroundColor: "green" } : {}}
          className={Classes.StationPoint}
        >
          {station.found && station.displayName}
          {station.found && (
            <div className={Classes.BadgeContainer}>
              {station.operators.map((Operator, idx) => (
                <OperatorBadge key={idx} operator={Operator} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
