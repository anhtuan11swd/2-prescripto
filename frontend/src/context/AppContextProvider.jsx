import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AppContext from "./AppContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const AppContextProvider = (props) => {
  const currencySymbol = "₫";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const getDoctorsData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/user/doctors`);

      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/v1/user/doctors`)
      .then(({ data }) => {
        if (data.success) {
          setDoctors(data.doctors);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const logOut = useCallback(() => {
    setToken("");
    localStorage.removeItem("token");
    setUserData(false);
  }, []);

  const loadUserProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/user/get-profile`,
        {
          headers: { token },
        },
      );

      if (data.success) {
        setUserData(data.userData);
      } else {
        logOut();
      }
    } catch (error) {
      console.log(error);
      logOut();
    }
  }, [logOut, token]);

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get(`${backendUrl}/api/v1/user/get-profile`, { headers: { token } })
      .then(({ data }) => {
        if (data.success) {
          setUserData(data.userData);
        } else {
          logOut();
        }
      })
      .catch(() => logOut());
  }, [logOut, token]);

  const value = {
    backendUrl,
    currencySymbol,
    doctors,
    getDoctorsData,
    loadUserProfileData,
    logOut,
    setToken,
    token,
    userData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
