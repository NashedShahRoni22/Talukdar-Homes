import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function Main() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
