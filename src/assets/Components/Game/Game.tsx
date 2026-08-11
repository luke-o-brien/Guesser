import { useState } from "react";
import gameData from '../../../data/GameData.json'
import Map from "./Map/Map";
import { TopBar } from "./Header/Header";
import { ConfirmationDialog } from "./ConfirmationDialog/ConfirmationDialog";

export const Game = () => {

  const userPreferenceData = localStorage.getItem('userPreferances')
  // const localStorageData = localStorage.getItem('gameData')

  const [gameArray, setGameArray] = useState(gameData);
  const [resetIsOpen, setResetIsOpen] = useState(false)
  // const [gameArray, setGameArray] = useState(localStorageData ? JSON.parse(localStorageData) : stationData);
  const [foundCountries, setFoundCountries] = useState(0);
  const [guess, setGuess] = useState("");
  const [userPreferences, setUserPreferences] = useState(userPreferenceData ? JSON.parse(userPreferenceData) : window.matchMedia("(prefers-color-scheme: dark)").matches ? { theme: 'dark'} : { theme: 'light'} )

  const onSubmit = (e) => {
    e.preventDefault();
    const matchedStation = gameArray.find(
      (station) =>
        station.name.toLowerCase() === guess.toLowerCase() ||
        station.displayName.toLowerCase() === guess.toLowerCase(),
    );

    if (matchedStation && matchedStation.found !== true) {
      setFoundCountries(foundCountries + 1);
      const updatedArray = gameArray.map((station) =>
          station === matchedStation ? { ...station, found: true } : station,
      ) 
      setGameArray(updatedArray);
      setGuess("");
      // localStorage.setItem("gameData", JSON.stringify(updatedArray));
    } else {
      console.log("not found");
    }
  };

  const resetGame = () => {
    setGameArray(gameData)
    setFoundCountries(0)
  }

  return (
    <div style={{ width: "100vw" }}>
      <TopBar
        onSubmit={onSubmit}
        setGuess={setGuess}
        stationData={gameData}
        foundCountries={foundCountries}
        guess={guess}
        userPreferences={userPreferences}
        setUserPreferences={setUserPreferences}
        setResetIsOpen={setResetIsOpen}
      />
      {resetIsOpen && <ConfirmationDialog type={'reset'} cancelAction={setResetIsOpen} confirmAction={resetGame} />}
      <Map stationData={gameArray} userPreferences={userPreferences} />
    </div>
  );
};
