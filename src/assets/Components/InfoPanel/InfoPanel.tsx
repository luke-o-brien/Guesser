import { useState } from 'react';
import Classes from './InfoPanel.module.scss'

export const InfoPanel = () => {

  const [showMore, setShowMore] = useState(false)
  const [overallProgress, setOverallProgress] = useState({
    total: 12,
    guessed: 2
  })

  const progress = [
    { shortName: 'EMR', longName: 'East Midlands Railway', colour: '#4c2f48', totalStations: 110, guessed: 93 }
  ]
  return (
    <div className={Classes.InfoPanel}>
      <h3>Progress</h3>
      <div className={Classes.ProgressSection}>
        <div>
          <progress
            style={{ accentColor: "green" }}
            max={overallProgress.total}
            value={overallProgress.guessed}
          >
          </progress>
          <p>
            {overallProgress.guessed}/{overallProgress.total}
          </p>
        </div>
        <button onClick={() => setShowMore(!showMore)}>View more</button>
      </div>
      { showMore && <div>
        <p>companies</p>
        <div className={Classes.ProgressList}>
          {progress.map((company, idx) => (
            <div className={Classes.CompanyCard} key={idx}>
              <p className={Classes.NameContainer}>{company.shortName}</p>
              <progress
                style={{ accentColor: company.colour, width: "100px" }}
                max={company.totalStations}
                value={company.guessed}
              ></progress>
              <p>
                {company.guessed}/{company.totalStations}
              </p>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}