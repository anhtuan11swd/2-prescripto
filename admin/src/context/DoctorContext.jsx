import { useState } from "react";
import { DoctorContext } from "./DoctorContext.context.js";

const DoctorContextProvider = ({ children }) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "",
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    backendUrl,
    dToken,
    setDToken,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
