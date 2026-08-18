import { Link } from "react-router-dom";
import Classes from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRotateLeft,
  faBars,
  faEllipsis,
  faHamburger,
  faLightbulb,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Dialog } from "../../../../SharedComponents/Dialog/Dialog";
import { useMobileView } from "../../../../logic/Hooks/useMobileView";
export const TopBar = ({ ...props }) => {
  const isMobile = useMobileView();

  return (
    <>
      {isMobile ? <MobileToolbar {...props} /> : <DesktopToolbar {...props} />}
    </>
  );
};

const MobileToolbar = ({
  onSubmit,
  setGuess,
  stationData,
  progress,
  guess,
  userPreferences,
  setUserPreferences,
  setResetIsOpen,
  setProgressIsOpen,
}) => {
  const [mobileMenuOpen, setMobileMenOpen] = useState(false);
  return (
    <div className={Classes.TopBarContainer}>
      <div className={Classes.ButtonsContainer}>
        <button
          className={Classes.TopBarMobileButton}
          onClick={() => setMobileMenOpen(!mobileMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {mobileMenuOpen && (
          <Dialog>
            <Link to="/">
              <button className={Classes.MenuMobileButton}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  style={{ transform: "scaleX(-1)" }}
                />
                <p>Exit game</p>
              </button>
            </Link>
            <button
              className={Classes.MenuMobileButton}
              onClick={() =>
                setUserPreferences(
                  userPreferences.theme === "light"
                    ? { theme: "dark" }
                    : { theme: "light" },
                )
              }
            >
              <FontAwesomeIcon icon={faLightbulb} />
              <p>Toggle theme</p>
            </button>
            <button
              className={Classes.MenuMobileButton}
              disabled={progress === 0}
              onClick={() => setResetIsOpen(true)}
            >
              <FontAwesomeIcon icon={faArrowRotateLeft} />
              <p>Reset</p>
            </button>
            <button
              onClick={() => setMobileMenOpen(false)}
              className={Classes.MenuMobileButton}
            >
              <FontAwesomeIcon icon={faXmark} />
              <p>close</p>
            </button>
          </Dialog>
        )}
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className={Classes.GuessInput}
          placeholder="Type a city name"
        ></input>
      </form>
      <div className={Classes.ProgressContainer}>
        <div className={Classes.ProgressCount}>
          <p>
            {progress}/{stationData.length}
          </p>
        </div>
      </div>
    </div>
  );
};

const DesktopToolbar = ({
  onSubmit,
  setGuess,
  stationData,
  progress,
  guess,
  userPreferences,
  setUserPreferences,
  setResetIsOpen,
  setProgressIsOpen,
}) => {
  return (
    <div className={Classes.TopBarContainer}>
      <div className={Classes.ButtonsContainer}>
        <Link to="/">
          <button className={Classes.TopBarButton}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              style={{ transform: "scaleX(-1)" }}
            />
          </button>
        </Link>
        <button
          className={Classes.TopBarButton}
          onClick={() =>
            setUserPreferences(
              userPreferences.theme === "light"
                ? { theme: "dark" }
                : { theme: "light" },
            )
          }
        >
          <FontAwesomeIcon icon={faLightbulb} />
        </button>
        <button
          className={Classes.TopBarButton}
          disabled={progress === 0}
          onClick={() => setResetIsOpen(true)}
        >
          Reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className={Classes.GuessInput}
          placeholder="Type a city name"
        ></input>
      </form>
      <button
        className={Classes.ProgressContainer}
        onClick={() => setProgressIsOpen(true)}
      >
        <div className={Classes.ProgressCount}>
          <p>Progress:</p>
          <p>
            {progress} / {stationData.length}
          </p>
        </div>
        <progress
          style={{ accentColor: "green", width: "120px", height: "18px" }}
          max={stationData.length}
          value={progress}
        ></progress>
      </button>
    </div>
  );
};
