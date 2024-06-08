import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer";
import { IoCalendarOutline } from "react-icons/io5";
import { Dialog } from "@material-tailwind/react";
import BookingForm from "../components/BookingForm";

export default function Main() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
      {/* make appointment  */}
      <button
        onClick={handleOpen}
        className="fixed right-5 bottom-5 bg-black text-white hover:text-primary hover:bg-white flex gap-2 items-center p-2.5 md:px-5  md:py-2 rounded-full shadow border-2 hover:shadow-xl hover:border-primary  w-fit group ease-linear duration-300"
      >
        <IoCalendarOutline className="text-xl md:text-3xl" />
        <span className="hidden md:block">Book Now</span>
      </button>
      <Dialog open={open} handler={handleOpen}>
        <BookingForm handleOpen={handleOpen} />
      </Dialog>
    </main>
  );
}
