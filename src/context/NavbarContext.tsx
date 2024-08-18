import React, { useContext } from "react";
import { mainMenu, Navbar } from "../menu/menu";

export type NavbarContextType = Navbar;

const NavbarContext: React.Context<{
  nav: NavbarContextType;
  setNav: React.Dispatch<React.SetStateAction<NavbarContextType>> | null;
}> = React.createContext<{
  nav: NavbarContextType;
  setNav: React.Dispatch<React.SetStateAction<NavbarContextType>> | null;
}>({
  nav: mainMenu,
  setNav: null,
});

const NavbarProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode => {
  const [nav, setNav] = React.useState<NavbarContextType>(mainMenu);

  return (
    <NavbarContext.Provider value={{ nav, setNav }}>
      {children}
    </NavbarContext.Provider>
  );
};

export type NavbarHookParams = {
  nav: NavbarContextType;
  setNav: React.Dispatch<React.SetStateAction<NavbarContextType>>;
};

export const useNavbar = (): NavbarHookParams => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useDialogState must be used within a SharedStateProvider");
  }

  const props = {
    nav: context.nav,
    setNav: context.setNav!,
  };
  return props;
};

export { NavbarContext };
export default NavbarProvider;
