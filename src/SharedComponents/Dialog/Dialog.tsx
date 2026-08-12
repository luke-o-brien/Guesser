import { ReactNode } from "react";
import Classes from "./Dialog.module.scss";

interface DialogProps {
  children: ReactNode;
}

export const Dialog = ({ children }: DialogProps) => {
  return (
    <div className={Classes.Dialog}>
      <div className={Classes.DialogContent}>{children}</div>
    </div>
  );
};
