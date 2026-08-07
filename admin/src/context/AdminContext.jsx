import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { AdminContext } from "./AdminContext.context.js";

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "",
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/admin/all-doctors`,
        { headers: { atoken: aToken } },
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [aToken]);

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/admin/change-availability`,
        { docId },
        { headers: { atoken: aToken } },
      );

      if (data.success) {
        toast.success(data.message);
        await getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/admin/appointments`,
        { headers: { atoken: aToken } },
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [aToken]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/admin/cancel-appointment`,
        { appointmentId },
        { headers: { atoken: aToken } },
      );

      if (data.success) {
        toast.success(data.message);
        await getAllAppointments();
        await getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/admin/dashboard`, {
        headers: { atoken: aToken },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [aToken]);

  const value = {
    appointments,
    aToken,
    backendUrl,
    cancelAppointment,
    changeAvailability,
    dashData,
    doctors,
    getAllAppointments,
    getAllDoctors,
    getDashData,
    setAToken,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
