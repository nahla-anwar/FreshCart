import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container py-16 px-3 min-h-[60vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
