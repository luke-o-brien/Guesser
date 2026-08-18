import Classes from './ProgressDialog.module.scss'

export const ProgressDialog = ({ progress, gameData, setProgressIsOpen }) => {
  return (
    <div>
      <p>Progress</p>
      <div>
        <div className={Classes.ProgressCount}>
          <p>Overall Progress:</p>
          <p>
            {progress} / {gameData.length}
          </p>
        </div>
        <progress
          style={{ accentColor: "green", width: "100%", height: "32px" }}
          max={gameData.length}
          value={progress}
        ></progress>
      </div>
      <button onClick={() => setProgressIsOpen(false)}>
Close
      </button>
      </div>
  )
}