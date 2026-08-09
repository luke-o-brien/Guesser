import Classes from "./Header.module.scss"

export const TopBar = ({
  onSubmit,
  setGuess,
  stationData,
  foundCountries,
  guess,
  userPreferences,
  setUserPreferences,
}) => {
  return (
    <div className={Classes.TopBarContainer}>
      <div className={Classes.ButtonsContainer}>
        <button
          className={Classes.TopBarButton}
          onClick={() => setUserPreferences(userPreferences.theme === "light" ? { theme: "dark" } : {theme: "light"})}
        >
          Toggle Theme
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
        <progress
          style={{ accentColor: "purple" }}
          max={stationData.length}
          value={foundCountries}
        ></progress>
        <p>
          {foundCountries}/{stationData.length}
        </p>
      </div>
    </div>
  );
};
