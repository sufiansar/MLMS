import { Outlet } from "react-router";
import Navbar from "./Ui/Layout/Navbar/Navbar";
import Footer from "./Ui/Layout/Navbar/Footer";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <Navbar />

      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
