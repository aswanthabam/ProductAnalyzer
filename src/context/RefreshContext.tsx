import React, { useContext } from "react";

const RefreshContext: React.Context<{
  refresh: string | null;
  setRefresh: React.Dispatch<React.SetStateAction<string | null>> | null;
}> = React.createContext<{
  refresh: string | null;
  setRefresh: React.Dispatch<React.SetStateAction<string | null>> | null;
}>({
  refresh: null,
  setRefresh: null,
});

const RefreshProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode => {
  const [refresh, setRefresh] = React.useState<string | null>(null);

  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export type RefreshHookParams = {
  refresh: string | null;
  doRefresh: (entity: string) => void;
};

export const useRefresh = (): RefreshHookParams => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error(
      "useRefreshState must be used within a SharedStateProvider"
    );
  }

  return {
    refresh: context.refresh,
    doRefresh: (entity: string) => {
      context.setRefresh!(entity);
    },
  };
};

export { RefreshContext };
export default RefreshProvider;
