import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layout/Main.jsx";
import Home from "./pages/Home/Home.jsx";
import Contact from "./pages/Contact.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import About from "./pages/About/About.jsx";
import Services from "./pages/Services/Services.jsx";
import Construction from "./pages/Services/Details/Construction.jsx";
import Renovation from "./pages/Services/Details/Renovation.jsx";
import Development from "./pages/Services/Details/Development.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/construction_services",
        element: <Construction />,
      },
      {
        path: "/renovation_services",
        element: <Renovation />,
      },
      {
        path: "/development_services",
        element: <Development />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
