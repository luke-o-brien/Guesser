import Classes from "./Header.module.scss"

export const TopBar = ({ setView, onSubmit, setGuess, stationData, foundCountries, guess }) => {
  return (<div className={Classes.TopBarContainer}>
    <div className={Classes.ButtonContainer}>
      <button onClick={() => setView("list")}>List view</button>
      <button onClick={() => setView("map")}>Map view</button>
    </div>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className={Classes.GuessInput}
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
  </div>)
}
