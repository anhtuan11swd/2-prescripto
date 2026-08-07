import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { DoctorContext } from "./DoctorContext.context.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const DoctorContextProvider = ({ children }) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "",
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/doctor/appointments`,
        { headers: { dtoken: dToken } },
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [dToken]);

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dtoken: dToken } },
      );

      if (data.success) {
        toast.success(data.message);
        await getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dtoken: dToken } },
      );

      if (data.success) {
        toast.success(data.message);
        await getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/doctor/dashboard`,
        { headers: { dtoken: dToken } },
      );

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [dToken]);

  const getProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/doctor/profile`, {
        headers: { dtoken: dToken },
      });

      if (data.success) {
        setProfileData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [dToken]);

  const updateProfile = async (fees, address, available) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/doctor/update-profile`,
        { address, available, fees },
        { headers: { dtoken: dToken } },
      );

      if (data.success) {
        toast.success(data.message);
        await getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    appointments,
    backendUrl,
    cancelAppointment,
    completeAppointment,
    dashData,
    dToken,
    getAppointments,
    getDashData,
    getProfileData,
    profileData,
    setDToken,
    updateProfile,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
