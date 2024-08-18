import React, { ReactNode, useContext } from "react";

export type DialogContextType = {
  child: ReactNode | null;
};

const DialogContext: React.Context<{
  dialog: DialogContextType;
  setDialog: React.Dispatch<React.SetStateAction<DialogContextType>> | null;
}> = React.createContext<{
  dialog: DialogContextType;
  setDialog: React.Dispatch<React.SetStateAction<DialogContextType>> | null;
}>({
  dialog: {
    child: null,
  },
  setDialog: null,
});

const DialogProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode => {
  const [dialog, setDialog] = React.useState<DialogContextType>({
    child: null,
  });

  return (
    <DialogContext.Provider value={{ dialog, setDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export type DialogHookParams = {
  dialog: DialogContextType;
  showDialog: (child: ReactNode, hideAfter?: number | null) => void;
  hideDialog: () => void;
};

export const useDialog = (): DialogHookParams => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogState must be used within a SharedStateProvider");
  }
  // hides a dialog
  const hideDialog = () => {
    context!.setDialog!({
      child: null,
    });
  };
  // shows a dialog
  const showDialog = (child: ReactNode, hideAfter: number | null = null) => {
    context!.setDialog!({
      child: child,
    });
    if (hideAfter) {
      setTimeout(() => {
        hideDialog();
      }, hideAfter);
    }
  };
  const props = {
    dialog: context.dialog,
    showDialog,
    hideDialog,
  };
  return props;
};

export { DialogContext };
export default DialogProvider;
