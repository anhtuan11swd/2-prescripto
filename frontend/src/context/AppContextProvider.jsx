import { doctors } from "../assets/assets";
import AppContext from "./AppContext";

export const AppContextProvider = (props) => {
  const value = { doctors };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
