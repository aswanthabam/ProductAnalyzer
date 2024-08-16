import React, { ReactNode, useContext } from "react";
import InfoToast from "../../components/toast/InfoToast/InfoToast";

export type ToastContextType = {
  child: ReactNode | null;
};

const ToastContext: React.Context<{
  toast: ToastContextType;
  infoToast: ToastContextType;
  setToast: React.Dispatch<React.SetStateAction<ToastContextType>> | null;
  setInfoToast: React.Dispatch<React.SetStateAction<ToastContextType>> | null;
}> = React.createContext<{
  toast: ToastContextType;
  infoToast: ToastContextType;
  setToast: React.Dispatch<React.SetStateAction<ToastContextType>> | null;
  setInfoToast: React.Dispatch<React.SetStateAction<ToastContextType>> | null;
}>({
  toast: {
    child: null,
  },
  infoToast: {
    child: null,
  },
  setToast: null,
  setInfoToast: null,
});

const ToastProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [toast, setToast] = React.useState<ToastContextType>({
    child: null,
  });
  const [infoToast, setInfoToast] = React.useState<ToastContextType>({
    child: null,
  });

  return (
    <ToastContext.Provider value={{ toast, setToast, infoToast, setInfoToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export type ToastHookParams = {
  toast: ToastContextType;
  infoToast: ToastContextType;
  showToast: (child: ReactNode, hideAfter?: number | null) => void;
  hideToast: () => void;
  showInfoToast: (child: ReactNode, hideAfter?: number | null) => void;
  hideInfoToast: () => void;
};

export const useToast = (): ToastHookParams => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastState must be used within a SharedStateProvider");
  }
  // hides a toast
  const hideToast = () => {
    context!.setToast!({
      child: null,
    });
  };
  // shows a toast
  const showToast = (child: ReactNode, hideAfter: number | null = 3000) => {
    context!.setToast!({
      child: child,
    });
    if (hideAfter) {
      setTimeout(() => {
        hideToast();
      }, hideAfter);
    }
  };
  // hides an info toast
  const hideInfoToast = () => {
    context!.setInfoToast!({
      child: null,
    });
  };

  // shows an info toast
  const showInfoToast = (child: ReactNode, hideAfter: number | null = null) => {
    context!.setInfoToast!({
      child: child,
    });
    if (hideAfter) {
      setTimeout(() => {
        hideInfoToast();
      }, hideAfter);
    }
  };
  const props = {
    toast: context!.toast,
    showToast,
    hideToast,
    infoToast: context!.infoToast,
    showInfoToast,
    hideInfoToast,
  };
  return props;
};

export { ToastContext };
export default ToastProvider;
