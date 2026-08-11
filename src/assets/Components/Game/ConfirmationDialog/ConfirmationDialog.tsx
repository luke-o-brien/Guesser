import Classses from "./ConfirmationDialog.module.scss";

type ConfirmationDialogType = "reset" | "quit";

interface ConfirmationDialogProps {
  type: ConfirmationDialogType;
  cancelAction: (value: boolean) => void;
  confirmAction?: () => void;
}

export const ConfirmationDialog = ({
  type,
  cancelAction,
  confirmAction,
}: ConfirmationDialogProps) => {

  return (
    <div className={Classses.Dialog}>
      <div className={Classses.DialogContent}>
        <p className={Classses.DialogHeading}>
          {type === "reset"
            ? "Reset progress"
            : type === "quit"
              ? "quit game"
              : ""}
        </p>
        {type === "reset" && (
          <p className={Classses.Text}>
            You are about to reset the game this action cannot be undone. You
            will lose your progress. Are you sure you wish to proceed?
          </p>
        )}
        {type === "quit" && (
          <p>
            You are about to quit this game. If you proceed you will loose your
            progress
          </p>
        )}
        <div className={Classses.ButtonsContainer}>
          <button
            className={Classses.CancelButton}
            onClick={() => cancelAction(false)}
          >
            Cancel
          </button>
          <button
            className={Classses.ActionButton}
            onClick={() => {
              confirmAction();
              cancelAction(false);
            }}
          >
            {type === "reset" ? "Reset" : type === "quit" ? "quit " : ""}
          </button>
        </div>
      </div>
    </div>
  );
};