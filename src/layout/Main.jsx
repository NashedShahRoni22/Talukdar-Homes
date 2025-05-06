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
        className="group fixed bottom-5 right-5 z-50 flex w-fit items-center gap-2 rounded-full border-2 bg-black p-2.5 text-white shadow hover:border-primary hover:shadow-xl"
      >
        <IoCalendarOutline className="text-xl md:text-3xl" />
        <span className="hidden duration-700 ease-linear md:group-hover:block">
          Book Now
        </span>
      </button>
      <Dialog open={open} handler={handleOpen}>
        <BookingForm handleOpen={handleOpen} />
      </Dialog>
    </main>
  );
}
