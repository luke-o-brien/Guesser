import { Link } from "react-router-dom"
import Classes from './Home.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas, faEarthAsia, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { faEarthEurope } from "@fortawesome/free-solid-svg-icons";
import { faEarthAfrica } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const Home = () => {

  const [startWizard, setStartWizard] = useState({
    step: 0,
    gameType: '',
    region: ''
  })
  return (
    <div className={Classes.PageContent}>
      <div className={Classes.TitleContainer}>
        <h1>MapQuizzer</h1>
        <h4>Test your georgraphy knowledge</h4>
      </div>
      <div className={Classes.WizardHeader}>
        <p className={Classes.StartName}>Start New Game</p>
        <p>
          {startWizard.step === 0
            ? "please select a game type"
            : startWizard.step === 1
              ? "Select a region"
              : " "}
        </p>
      </div>
      <div className={Classes.WizardContainer}>
        {startWizard.step === 0 && (
          <button
            className={Classes.NewGameButton}
            onClick={() =>
              setStartWizard((prev) => ({
                ...prev,
                step: 1,
                gameType: "capitals",
              }))
            }
          >
            <FontAwesomeIcon icon={faCity} size="xl" />
            <p className={Classes.NewGameButtonHeader}>Capital Cities</p>
            <p className={Classes.NewGameButtonSubHeader}>
              Name capitals of a region or the world
            </p>
          </button>
        )}
        {startWizard.step === 1 && (
          <>
            <Link to={`/game?type=${startWizard.gameType}&region=${"Europe"}`}>
              <button className={Classes.NewGameButton}>
                <FontAwesomeIcon icon={faEarthEurope} size="xl" />
                <p className={Classes.NewGameButtonHeader}>
                  Capitals of Europe
                </p>
                <p className={Classes.NewGameButtonSubHeader}>
                  Name all capitals of Europe
                </p>
              </button>
            </Link>
            <Link to={`/game?type=${startWizard.gameType}&region=${"Africa"}`}>
              <button className={Classes.NewGameButton}>
                <FontAwesomeIcon icon={faEarthAfrica} size="xl" />
                <p className={Classes.NewGameButtonHeader}>
                  Capitals of Africa
                </p>
                <p className={Classes.NewGameButtonSubHeader}>
                  Name all capitals of Africa
                </p>
              </button>
            </Link>
            <Link to={`/game?type=${startWizard.gameType}&region=${"Asia"}`}>
              <button className={Classes.NewGameButton}>
                <FontAwesomeIcon icon={faEarthAsia} size="xl" />
                <p className={Classes.NewGameButtonHeader}>Capitals of Asia</p>
                <p className={Classes.NewGameButtonSubHeader}>
                  Name all capitals of Asia
                </p>
              </button>
            </Link>
            <Link to={`/game?type=${startWizard.gameType}&region=${"SouthAmerica"}`}>
              <button className={Classes.NewGameButton}>
                <FontAwesomeIcon icon={faEarthAmericas} size="xl" />
                <p className={Classes.NewGameButtonHeader}>Capitals of South America</p>
                <p className={Classes.NewGameButtonSubHeader}>
                  Name all capitals of South America 
                </p>
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}