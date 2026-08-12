import { Link } from "react-router-dom"
import Classes from './Home.module.scss'

export const Home = () => {
  return (
    <div className={Classes.PageContent}>
      <div className={Classes.TitleContainer}>
        <h1>MapQuizzer</h1>
        <h4>Test your georgraphy knowledge</h4>
      </div>
      <Link to="/game" className={Classes.ButtonLink}>
        <button className={Classes.NewGameButton}>
          <p className={Classes.NewGameButtonHeader}>Start New Game</p>
          <p className={Classes.NewGameButtonSubHeader}>
            Find all capitals of Europe
          </p>
        </button>
      </Link>
    </div>
  );
}