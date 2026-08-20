import { useState } from "react";
import gameData from "../../data/GameData.json";
import { Dialog } from "../../SharedComponents/Dialog/Dialog";
import { ConfirmationDialog } from "../../assets/Components/Game/ConfirmationDialog/ConfirmationDialog";
import { TopBar } from "../../assets/Components/Game/Header/Header";
import Map from "../../assets/Components/Game/Map/Map";
import { WinnerDialog } from "../../assets/Components/Game/WinnerDialog/WinnerDialog";
import { ProgressDialog } from "../../assets/Components/Game/ProgressDialog/ProgressDialog";

export const Game = () => {

const generateProgress = () => {
  if (gameData.at(0)?.category) {
    console.log("multicategory");
    const obj = {
      total: gameData.length,
      overallProgress: 0,
    };
    gameData.forEach((item) => {
      if (obj[item.category.value]) {
        obj[item.category.value].total = obj[item.category.value].total + 1;
      } else {
        obj[item.category.value] = {
          name: item.category.value,
          type: item.category.name,
          total: 1,
          progress: 0,
        };
      }
    });
    console.log(obj);
    return obj
  } 

  return 0;
};
  const userPreferenceData = localStorage.getItem("userPreferances");
  // const localStorageData = localStorage.getItem('gameData')

  const [gameArray, setGameArray] = useState(gameData);
  const [resetIsOpen, setResetIsOpen] = useState(false);
  const [progressIsOpen, setProgressIsOpen] = useState(false);
  // const [gameArray, setGameArray] = useState(localStorageData ? JSON.parse(localStorageData) : stationData);
  const [progress, setProgress] = useState(generateProgress());
  const [guess, setGuess] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [userPreferences, setUserPreferences] = useState(
    userPreferenceData
      ? JSON.parse(userPreferenceData)
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? { theme: "dark" }
        : { theme: "light" },
  );

  console.log('progress:', progress)

  const onSubmit = (e) => {
    e.preventDefault();
    const matchedStation = gameArray.find(
      (station) =>
        station.name.toLowerCase() === guess.toLowerCase() ||
        station.displayName.toLowerCase() === guess.toLowerCase(),
    );

    if (matchedStation && matchedStation.found !== true) {
      setProgress(progress + 1);
      const updatedArray = gameArray.map((station) =>
        station === matchedStation ? { ...station, found: true } : station,
      );
      if (progress + 1 === gameArray.length) {
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
    setProgress(0);
  };

  return (
    <div style={{ width: "100vw" }}>
      <TopBar
        onSubmit={onSubmit}
        setGuess={setGuess}
        stationData={gameData}
        progress={progress}
        guess={guess}
        userPreferences={userPreferences}
        setUserPreferences={setUserPreferences}
        setResetIsOpen={setResetIsOpen}
        setProgressIsOpen={setProgressIsOpen}
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
      {progressIsOpen && (
        <Dialog>
          <ProgressDialog progress={progress} gameData={gameArray} setProgressIsOpen={setProgressIsOpen} />
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
