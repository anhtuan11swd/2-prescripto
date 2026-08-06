import { useState } from "react";
import { AdminContext } from "./AdminContext.context.js";

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "",
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    aToken,
    backendUrl,
    setAToken,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
