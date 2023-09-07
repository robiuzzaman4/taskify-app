import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="bg-neutral-50 text-neutral-900 min-h-screen">
      <Navbar />
      <Outlet />
      <Toaster />
    </main>
  );
};

export default App;