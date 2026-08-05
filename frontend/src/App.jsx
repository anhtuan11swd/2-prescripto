import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./Pages/Home"));
const Doctors = lazy(() => import("./Pages/Doctors"));
const Login = lazy(() => import("./Pages/Login"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const MyProfile = lazy(() => import("./Pages/MyProfile"));
const MyAppointments = lazy(() => import("./Pages/MyAppointments"));
const Appointment = lazy(() => import("./Pages/Appointment"));

const App = () => {
  return (
    <div className="px-4 pt-20">
      <Navbar />
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
          </div>
        }
      >
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Doctors />} path="/doctors" />
          <Route element={<Doctors />} path="/doctors/:speciality" />
          <Route element={<Login />} path="/login" />
          <Route element={<About />} path="/about" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<MyProfile />} path="/my-profile" />
          <Route element={<MyAppointments />} path="/my-appointments" />
          <Route element={<Appointment />} path="/appointment/:docId" />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
