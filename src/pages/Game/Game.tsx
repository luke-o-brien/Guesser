import { useState } from "react";
import gameData from "../../data/GameData.json";
import { Dialog } from "../../SharedComponents/Dialog/Dialog";
import { ConfirmationDialog } from "../../assets/Components/Game/ConfirmationDialog/ConfirmationDialog";
import { TopBar } from "../../assets/Components/Game/Header/Header";
import Map from "../../assets/Components/Game/Map/Map";
import { WinnerDialog } from "../../assets/Components/Game/WinnerDialog/WinnerDialog";

export const Game = () => {
  const userPreferenceData = localStorage.getItem("userPreferances");
  // const localStorageData = localStorage.getItem('gameData')

  const [gameArray, setGameArray] = useState(gameData);
  const [resetIsOpen, setResetIsOpen] = useState(false);
  // const [gameArray, setGameArray] = useState(localStorageData ? JSON.parse(localStorageData) : stationData);
  const [foundCountries, setFoundCountries] = useState(0);
  const [guess, setGuess] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [userPreferences, setUserPreferences] = useState(
    userPreferenceData
      ? JSON.parse(userPreferenceData)
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? { theme: "dark" }
        : { theme: "light" },
  );

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
      );
      if (foundCountries + 1 === gameArray.length) {
        console.log("won");
        setHasWon(true);
      }
      setGameArray(updatedArray);
      setGuess("");
      // localStorage.setItem("gameData", JSON.stringify(updatedArray));
    } else {
      console.log("not found");
    }
  };

  const resetGame = () => {
    setGameArray(gameData);
    setFoundCountries(0);
  };

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
      {resetIsOpen && (
        <Dialog>
          <ConfirmationDialog
            type={"reset"}
            cancelAction={setResetIsOpen}
            confirmAction={resetGame}
          />
        </Dialog>
      )}
      {hasWon && (
        <Dialog>
          <WinnerDialog reset={resetGame} setHasWon={setHasWon} />
        </Dialog>
      )}
      <Map stationData={gameArray} userPreferences={userPreferences} />
    </div>
  );
};
