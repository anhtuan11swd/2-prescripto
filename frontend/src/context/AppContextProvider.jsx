import { doctors } from "../assets/assets";
import AppContext from "./AppContext";

export const AppContextProvider = (props) => {
  const currencySymbol = "₫";
  const value = { currencySymbol, doctors };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
