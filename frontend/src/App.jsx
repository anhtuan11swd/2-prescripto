import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="mt-10 text-center font-bold text-3xl text-green-500">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      Testing Tailwind
    </div>
  );
};

export default App;
