import { useState } from "react";
import Classes from "./Game.module.scss";
import { OperatorBadge } from "../SubComponents/OperatorBadge/operatorBadge";
import { stationData } from "../../../data/StationData";
import Map from "./Map/Map";
import { TopBar } from "./Header/Header";

export const Game = () => {

  const userPreferenceData = localStorage.getItem('userPreferances')
  // const localStorageData = localStorage.getItem('gameData')

  const [stationArray, setStationArray] = useState(stationData);
  // const [stationArray, setStationArray] = useState(localStorageData ? JSON.parse(localStorageData) : stationData);
  const [foundCountries, setFoundCountries] = useState(0);
  const [view, setView] = useState("map");
  const [guess, setGuess] = useState("");
  const [userPreferences, setUserPreferences] = useState(userPreferenceData ? JSON.parse(userPreferenceData) : window.matchMedia("(prefers-color-scheme: dark)").matches ? { theme: 'dark'} : { theme: 'light'} )

  const onSubmit = (e) => {
    e.preventDefault();
    const matchedStation = stationArray.find(
      (station) =>
        station.name.toLowerCase() === guess.toLowerCase() ||
        station.displayName.toLowerCase() === guess.toLowerCase(),
    );

    if (matchedStation && matchedStation.found !== true) {
      setFoundCountries(foundCountries + 1);
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

  const resetGame = () => {
    setStationArray(stationData)
    setFoundCountries(0)
  }

  return (
    <div style={{ width: "100vw" }}>
      <TopBar
        onSubmit={onSubmit}
        setGuess={setGuess}
        stationData={stationData}
        foundCountries={foundCountries}
        guess={guess}
        userPreferences={userPreferences}
        setUserPreferences={setUserPreferences}
        resetGame={resetGame}
      />
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
        <Map stationData={stationArray} userPreferences={userPreferences} />
      )}
    </div>
  );
};
