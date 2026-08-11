import Classes from "./Header.module.scss"

export const TopBar = ({
  onSubmit,
  setGuess,
  stationData,
  foundCountries,
  guess,
  userPreferences,
  setUserPreferences,
  setResetIsOpen
}) => {
  return (
    <div className={Classes.TopBarContainer}>
      <div className={Classes.ButtonsContainer}>
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
          Toggle Theme
        </button>
        <button
          className={Classes.TopBarButton}
          onClick={() => setResetIsOpen(true)}>
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
      <div className={Classes.ProgressContainer}>
        <div className={Classes.ProgressCount}>
          <p>Progress:</p>
          <p>
            {foundCountries} / {stationData.length}
          </p>
        </div>
        <progress
          style={{ accentColor: "green", width: "120px", height: "18px" }}
          max={stationData.length}
          value={foundCountries}
        ></progress>
      </div>
    </div>
  );
};
