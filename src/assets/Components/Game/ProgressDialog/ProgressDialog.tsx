import Classes from './ProgressDialog.module.scss'

export const ProgressDialog = ({ progress, gameData, setProgressIsOpen }) => {

const convertProgress = () => {
  const progressObj = {
    overallProgress: progress.overallProgress,
    total: progress.total,
    categories: Object.entries(progress)
      .filter(([key]) => key !== "total" && key !== "overallProgress")
      .map(([key, value]) => value),
  };
  return progressObj;
};

  const DetailedProgress = convertProgress()
  
  console.log(DetailedProgress)

  return (
    <div>
      <p>Progress</p>
      <div>
        <div className={Classes.ProgressCount}>
          <p>Overall Progress:</p>
          <p>
            {DetailedProgress?.overallProgress} / {gameData.length}
          </p>
        </div>
        <progress
          style={{ accentColor: "green", width: "100%", height: "32px" }}
          max={gameData.length}
          value={DetailedProgress.overallProgress}
        ></progress>
      </div>
      <div>
        {DetailedProgress.categories.map((category, idx) => (
          <div>
        <div className={Classes.ProgressCount}>
          <p>{category.name}</p>
          <p>
            {category.progress} / {category.total}
          </p>
        </div>
        <progress
          style={{ accentColor: "green", width: "100%", height: "32px" }}
          max={category.total}
          value={category.progress}
        ></progress>
      </div>
          
        ))}
      </div>
      <button onClick={() => setProgressIsOpen(false)}>
Close
      </button>
      </div>
  )
}