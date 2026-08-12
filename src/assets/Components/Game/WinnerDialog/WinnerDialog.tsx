import Classes from './WinnerDialog.module.scss'
import { Link } from 'react-router-dom';

export const WinnerDialog = ({reset, setHasWon}) => {
  return (
    <>
        <p className={Classes.DialogHeading}>You Won</p>
        <p className={Classes.Text}>
          You correctly guess all the european capitals congrats.
        </p>
        <div className={Classes.ButtonsContainer}>
          <button className={Classes.ActionButton} onClick={() => { reset(); setHasWon(false) }}>
            Reset game
          </button>
          <Link to="/">
            <button className={Classes.ActionButton}>
              Return to home
            </button>
          </Link>
        </div>
    </>
  );
}