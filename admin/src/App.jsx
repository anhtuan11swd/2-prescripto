import { lazy, Suspense, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { AdminContext } from "./context/AdminContext.context.js";
import { DoctorContext } from "./context/DoctorContext.context.js";

const Login = lazy(() => import("./Pages/Login.jsx"));
const Dashboard = lazy(() => import("./Pages/Dashboard.jsx"));
const Appointments = lazy(() => import("./Pages/Appointments.jsx"));
const AddDoctor = lazy(() => import("./Pages/Admin/AddDoctor.jsx"));
const DoctorsList = lazy(() => import("./Pages/Admin/DoctorsList.jsx"));
const DoctorProfile = lazy(() => import("./Pages/DoctorProfile.jsx"));

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="h-screen">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5F6FFF] border-t-transparent" />
          </div>
        }
      >
        {aToken || dToken ? (
          <div className="flex h-full flex-col">
            <Navbar onToggleMenu={() => setIsMenuOpen((open) => !open)} />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
              />
              <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <Routes>
                  <Route element={<Dashboard />} path="/" />
                  <Route element={<Appointments />} path="/appointments" />

                  {aToken && (
                    <>
                      <Route element={<AddDoctor />} path="/add-doctor" />
                      <Route element={<DoctorsList />} path="/doctor-list" />
                    </>
                  )}

                  {dToken && (
                    <Route element={<DoctorProfile />} path="/profile" />
                  )}
                </Routes>
              </main>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </Suspense>

      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </div>
  );
};

export default App;
