import React, { ReactNode, useContext } from "react";

export type ToastContextType = {
  child: ReactNode | null;
};

const ToastContext: React.Context<{
  toast: ToastContextType;
  setToast: React.Dispatch<React.SetStateAction<ToastContextType>> | null;
}> = React.createContext<{
  toast: ToastContextType;
  setToast: React.Dispatch<React.SetStateAction<ToastContextType>> | null;
}>({
  toast: {
    child: null,
  },
  setToast: null,
});

const ToastProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [toast, setToast] = React.useState<ToastContextType>({
    child: null,
  });
  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export type ToastHookParams = {
  toast: ToastContextType;
  showToast: (child: ReactNode, hideAfter?: number | null) => void;
  hideToast: () => void;
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
  const props = {
    toast: context!.toast,
    showToast,
    hideToast,
  };
  return props;
};

export { ToastContext };
export default ToastProvider;
