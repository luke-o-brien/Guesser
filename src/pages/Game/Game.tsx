import { useState } from "react";
import gameData from "../../data/GameData.json";
import AfricaData from "../../data/AfricaCapitalsData.json"
import { Dialog } from "../../SharedComponents/Dialog/Dialog";
import { ConfirmationDialog } from "../../assets/Components/Game/ConfirmationDialog/ConfirmationDialog";
import { TopBar } from "../../assets/Components/Game/Header/Header";
import Map from "../../assets/Components/Game/Map/Map";
import { WinnerDialog } from "../../assets/Components/Game/WinnerDialog/WinnerDialog";
import { ProgressDialog } from "../../assets/Components/Game/ProgressDialog/ProgressDialog";
import { useSearchParams } from "react-router-dom";


export const Game = () => {

const generateProgress = () => {
  if (game.mapData.at(0)?.category) {
    const obj = {
      total: game.mapData.length,
      overallProgress: 0,
    };
    game.mapData.forEach((item) => {
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
    return obj;
  } 

  return 0;
};
  
  
  const updateProgress = (matchedStation) => {
    console.log(matchedStation)
    console.log(progress)
  setProgress((prev) => ({
    ...prev,
    overallProgress: prev.overallProgress + 1,
    [matchedStation.category.value]: {
      ...prev[matchedStation.category.value],
      progress: prev[matchedStation.category.value].progress + 1,
    },
  }));
  };
  
  // const gameType = 'Africa'

  const setGameData = () => {
    if (region === 'Europe') {
      return gameData
    } else if (region === 'Africa') {
      return AfricaData
    }
  }
  const userPreferenceData = localStorage.getItem("userPreferances");
  // const localStorageData = localStorage.getItem('gameData')

  const [searchParams] = useSearchParams();
  const quizType = searchParams.get("type");
  const region = searchParams.get("region");

  const [game, setGame] = useState(setGameData());
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


  const onSubmit = (e) => {
    e.preventDefault();
    const matchedStation = game.mapData.find(
      (station) =>
        station.name.toLowerCase() === guess.toLowerCase() ||
        station.displayName.toLowerCase() === guess.toLowerCase(),
    );

    if (matchedStation && matchedStation.found !== true) {
      const updatedArray = game.mapData.map((station) =>
        station === matchedStation ? { ...station, found: true } : station,
      );
      if (progress.overallProgress + 1 === game.mapData.length) {
        console.log("won");
        setHasWon(true);
      }
      setGame((prev) => ({ ...prev, mapData: updatedArray }));
      setGuess("");
      updateProgress(matchedStation);
      // localStorage.setItem("gameData", JSON.stringify(updatedArray));
    } else {
      console.log("not found");
    }
  };

  const resetGame = () => {
    setGame(setGameData());
    setProgress(generateProgress());
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
      <Map stationData={game?.mapData} region={region} userPreferences={userPreferences} />
    </div>
  );
};
